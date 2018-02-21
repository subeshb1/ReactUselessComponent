import React, { Component } from 'react';
import State from './state';
import StateArc from './arc';
import Point from './points';

class Draw extends Component {
    constructor(props) {
        super(props);
        
        
        this.state = {
            content: [
                ...this.getContentData()
            ],
            
            selectedItem:undefined,
            dragItem:undefined,
            scale:1,
            touchAction:'auto'
        }
       
        
        //handles drag setting
        this.setDragItem = this.setDragItem.bind(this);
        this.removeDrag = this.removeDrag.bind(this);
        this.moveChild=this.moveChild.bind(this);
        this.removeSelection = this.removeSelection.bind(this);
    
    }
    
    //to move a Child (mouseMove)
    moveChild(e) {
        // e.preventDefault();
        if(this.state.dragItem) {
            this.props.setSelected(this.state.dragItem);
            let rect = e.currentTarget.getBoundingClientRect();
            let clientX = e.clientX || e.touches[0].clientX;
            let clientY = e.clientY || e.touches[0].clientY;
            let offsetX = clientX - rect.left;
            let offsetY = clientY - rect.top;
            // console.log(e);
           
            this.state.dragItem.x = offsetX/this.state.scale;
            this.state.dragItem.y = offsetY/this.state.scale;
            
            this.setState({dragItem:this.state.dragItem});
        }
        
        
        e.stopPropagation();

    }

    //Remove dragItem when mouse Released (mouseUp)
    removeDrag(e) {
        if(this.state.dragItem) {
            this.state.dragItem.isDragged=false
            this.setState({dragItem: undefined,touchAction:'none'});
            
        }
        
    }

    //set a item to be draged
    setDragItem(index) {
        let dragItem = this.state.content[index];
        if(this.state.selectedItem)
            this.state.selectedItem.isSelected = false;
        dragItem.isDragged = true;
        dragItem.isSelected = true;
        this.props.setSelected(dragItem);
        this.setState({dragItem,selectedItem:dragItem,touchAction:'none'});
        
        
    }    

   //Remove Selection (onClick)
   removeSelection(e) {
       
       if(this.state.selectedItem) {
            this.state.selectedItem.isSelected = false;
            console.log("Removed",this.state);
            this.setState({selectedItem:undefined,touchAction:'auto'});
            this.props.setSelected(undefined);
       }
   }
   

    componentDidUpdate() {
        // console.log(this.state);
    }

    render() {

        let content = this.getContent();       
        return (
                
            <div 
           
            className="container-fluid col-12 col-lg-9 p-0 px-lg-2"
            
           >
                <div
                     style={ {
                        overflow: 'scroll', 
                        height:window.innerHeight - window.innerHeight*0.10,
                        
                    } }
                    className="container-fluid col-12">
                    <svg  
                        className="position-absolute"
                        width="300%" height="300%"
                        style={{background: "white",touchAction:this.state.touchAction,top:0,left:0}} 
                        onMouseMove={this.moveChild} 
                        onMouseUp={this.removeDrag}
                        onTouchEnd={this.removeDrag}
                        onMouseDown= {this.removeSelection}
                        onTouchMove={this.moveChild}>
                    
                    <g transform={`scale(${this.state.scale})`}>
                        {content}
                        </g>
                    </svg>
                </div>
               
                <div className=" position-absolute p-1" 
                    style={{top:0}} >
                    <div className="btn-group" hidden={this.state.selectedItem?true:false}>
                        <button className="btn btn-dark" onClick={() => {this.setState({scale:this.state.scale+0.05})}}><i className="fa fa-plus"></i></button>
                        <button className="btn btn-secondary" onClick={() => {this.setState({scale:this.state.scale-0.05})}}><i className="fa fa-minus"></i></button>
                    </div>
                </div>    
            </div>

            
        );
    }


    getContent() {
        return this.state.content.map((val,index) => {
            if(val.type == 'STATE') {
                return (
                <State key={index} 
                    cx={val.x} cy={val.y} 
                    index={index} text={val.name} 
                    isDragged={val.isDragged}
                    isSelected={val.isSelected}
                    onMouseDown={this.setDragItem}
                    isStart={val.isStart}
                    isFinal={val.isFinal}
                />
                )
            } else {
                return    ( 
                <StateArc key={index} 
                    index={index}
                    isSelected={val.isSelected}
                    start={ {x:val.start.x ,y: val.start.y } }
                    end={ {x: val.end.x,y:val.end.y} } 
                    invert={val.invert} 
                    onMouseDown={this.setDragItem}
                    input = {val.input}/>

                )
            }
            
            
        } );

    }

    getContentData() {
        let tuples = this.props.tuples;
        let y = 300;
        let x = -100;
        
        let stateContent = [];
        tuples.state.forEach( state=> {
            stateContent.push({
                type: "STATE",
                name: state,
                isDragged:false,
                isSelected:false,
                x:x+=200,
                y:y,
                isStart:tuples.initial == state,
                isFinal: ! (tuples.final.findIndex( val => val === state) == -1)
            });
        });

        let linkContent = [];
        for(let state in tuples.transition) {
            for(let input in tuples.transition[state]) {
                let start = stateContent.find(s => s.name == state);
                let end = stateContent.find(s => s.name == tuples.transition[state][input][0]);
                let link = linkContent.find(link => link.start == start && link.end == end);
                if(!link) {
                    linkContent.push ({
                        type: "ARC",
                        start,
                        end,
                        input : [input],
                        isDragged:false,
                        isSelected:false,
                    });
                 } else {
                     link.input.push(input)
                 }
            }
        }

        return [...linkContent,...stateContent];

    }

}

export default Draw;

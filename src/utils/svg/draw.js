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
            scale:0.9
        }
       
        
        //handles drag setting
        this.setDragItem = this.setDragItem.bind(this);
        this.removeDrag = this.removeDrag.bind(this);
        this.moveChild=this.moveChild.bind(this);
        this.removeSelection = this.removeSelection.bind(this);
    
    }
    
    //to move a Child (mouseMove)
    moveChild(e) {
        if(this.state.dragItem) {
           
            this.state.dragItem.x = e.nativeEvent.offsetX/this.state.scale;
            this.state.dragItem.y = e.nativeEvent.offsetY/this.state.scale;
            this.setState({dragItem:this.state.dragItem});
        }
        e.stopPropagation();

    }

    //Remove dragItem when mouse Released (mouseUp)
    removeDrag(e) {
        if(this.state.dragItem) {
            this.state.dragItem.isDragged=false
            this.setState({dragItem: undefined});
        }
    }

    //set a item to be draged
    setDragItem(index) {
        let dragItem = this.state.content[index];
        if(this.state.selectedItem)
            this.state.selectedItem.isSelected = false;
        dragItem.isDragged = true;
        dragItem.isSelected = true;
       
        this.setState({dragItem,selectedItem:dragItem});
        
    }    

   //Remove Selection (onClick)
   removeSelection(e) {
       if(this.state.selectedItem) {
        this.state.selectedItem.isSelected = false;
        this.setState({selectedItem:undefined});
       }
   }
   

    componentDidUpdate() {
        // console.log(this.state);
    }

    render() {

        let content = this.getContent();       
        return (
            
            <div 
            style={ {
                overflow: 'scroll', 
                padding:5,height:window.innerHeight - window.innerHeight*0.12
            } }
             
            className="container col-12 col-lg-9">

                <svg  
                     width="300%" height="300%"
                    style={{background: "white"}} 
                    onMouseMove={this.moveChild} 
                    onMouseUp={this.removeDrag}
                    onMouseDown= {this.removeSelection}
                    onTouchMove={this.moveChild}
                    
                >
                    
                   <g transform={`scale(${this.state.scale})`}>
                    {content}
                    </g>
                </svg>
                
            </div>

            
        );
    }


    getContent() {
        return this.state.content.map((val,index) => {
            if(val.type == 'State') {
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
                type: "State",
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
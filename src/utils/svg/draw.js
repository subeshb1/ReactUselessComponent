import React, { Component } from 'react';
import State from './state';
import StateArc from './arc';
import Point from './points';

class Draw extends Component {
    constructor(props) {
        super(props);
        
        
        this.state = {

            scale:1,//k
            touchAction:'auto'//k
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
        if(this.props.state.dragItem) {
            let rect = e.currentTarget.getBoundingClientRect();
            let clientX = e.clientX || e.touches[0].clientX;
            let clientY = e.clientY || e.touches[0].clientY;
            let offsetX = clientX - rect.left;
            let offsetY = clientY - rect.top;
            // console.log(e);
           
            this.props.state.dragItem.x = offsetX/this.state.scale;
            this.props.state.dragItem.y = offsetY/this.state.scale;
            this.props.setSelected(this.props.state.dragItem);
            this.setState({dragItem:this.state.dragItem});
        }
        
        
        e.stopPropagation();

    }

    //Remove dragItem when mouse Released (mouseUp)
    removeDrag(e) {
        if(this.props.state.dragItem) {
            this.props.state.dragItem.isDragged=false
            this.props.update( {dragItem:this.props.state.dragItem.isDragged,selectedItem:null});
            
        }
        
    }

    //set a item to be draged
    setDragItem(index) {
        // console.log("Enter");
        // let dragItem = this.props.state.content[index];
        // if(this.props.state.selectedItem)
        //     this.props.state.selectedItem.isSelected = false;
        // dragItem.isDragged = true;
        // dragItem.isSelected = true;
        // this.props.update( {dragItem,selectedItem:dragItem});
        // this.setState({touchAction:'none'});
        
        let item = Object.assign({},this.props.content[index]);
        let selectedItem = Object.assign({},this.props.selectedItem);
       
        selectedItem.index = index;
        selectedItem.item = item;
        item.isSelected = true;
        selectedItem.isDragged = true;
        this.props.update1( selectedItem);
        this.setState({touchAction:'none'});
        
    }
        

   //Remove Selection (onClick)
   removeSelection(e) {
       
       if(this.props.state.selectedItem) {
            this.props.state.selectedItem.isSelected = false;
            console.log("Removed",this.state);
            this.setState({touchAction:'auto'});
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
                        // onMouseMove={this.moveChild} 
                        // onMouseUp={this.removeDrag}
                        // onTouchEnd={this.removeDrag}
                        // onMouseDown= {this.removeSelection}
                        // onTouchMove={this.moveChild}
                        >
                    
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
        return this.props.content.map((val,index) => {
            if(val.type == 'STATE') {
                return (
                <State key={index} 
                    cx={val.x} cy={val.y} 
                    index={index} text={val.name} 
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

    

}

export default Draw;

import React, { Component } from 'react';
import State from './state';
import StateArc from './arc';
import Point from './points';

class Draw extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: [
                {
                    type: "State",
                    name: "q0",
                    isDragged:false,
                    isSelected:false,
                    x:100,
                    y:100,
                    isStart:true,
                    isFinal:true
                },
                {
                    type: "State",
                    name: "q1",
                    isDragged:false,
                    isSelected:false,
                    x: 300,
                    y:100,
                },
                {
                    type: "State",
                    name: "q2",
                    isDragged:false,
                    isSelected:false,
                    x: 500,
                    y:100,
                },
                {
                    type: "State",
                    name: "q3",
                    isDragged:false,
                    isSelected:false,
                    x: 700,
                    y:100,
                    isFinal:true
                },
            ],
            
            selectedItem:undefined,
            dragItem:undefined
        }
        this.state.content.unshift(
            {
                start:this.state.content[0],
                end:this.state.content[1],
                isDragged:false,
                    isSelected:false,
                
            },
            {
                start:this.state.content[1],
                end:this.state.content[0],
                isDragged:false,
                    isSelected:false,
                
            },
            {
                start:this.state.content[1],
                end:this.state.content[2],
                isDragged:false,
                    isSelected:false,
                
            },
            {
                start:this.state.content[0],
                end:this.state.content[3],
                isDragged:false,
                    isSelected:false,
                
            },
            
            {
                start:this.state.content[3],
                end:this.state.content[1],
                isDragged:false,
                    isSelected:false,
            },
            {
                start:this.state.content[1],
                end:this.state.content[1],
                isDragged:false,
                    isSelected:false,
            },
        
        );
        
        //handles drag setting
        this.setDragItem = this.setDragItem.bind(this);
        this.removeDrag = this.removeDrag.bind(this);
        this.moveChild=this.moveChild.bind(this);
        this.removeSelection = this.removeSelection.bind(this);
    
    }
    
    //to move a Child (mouseMove)
    moveChild(e) {
        if(this.state.dragItem) {
           
            this.state.dragItem.x = e.nativeEvent.offsetX;
            this.state.dragItem.y = e.nativeEvent.offsetY;
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

        let content = this.state.content.map((val,index) => {
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
                    onMouseDown={this.setDragItem}/>
                )
            }
            
            
        } );
        // let arc = this.state.arc.map((val,index) => {
        //     return     <StateArc key={index} 
        //     start={ {x:val.start.x ,y: val.start.y } }
        //      end={ {x: val.end.x,y:val.end.y} } 
        //      invert={val.invert} 
        //      onMouseDown={this.setDragItem}/>
        // })
        
        return (
            
            <div 
            style={ {
                overflow: 'scroll', 
                padding:5,height:window.innerHeight - window.innerHeight*0.09
            } }
             
            className="container-fluid col-12 col-md-9">

                <svg  
                    height="2000px" width="4000px" 
                    style={{background: "white"}} 
                    onMouseMove={this.moveChild} 
                    onMouseUp={this.removeDrag}
                    onMouseDown= {this.removeSelection}
                    onTouchMove={this.moveChild}
                >
                    
                   
                    {content}
                </svg>
                
            </div>

            
        );
    }
}

export default Draw;
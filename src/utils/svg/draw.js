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
                    name: "q1",
                    isDragged:false,
                    isSelected:false,
                    x:100,
                    y:100,
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
                    name: "q1",
                    isDragged:false,
                    isSelected:false,
                    x: 500,
                    y:100,
                },
                {
                    type: "State",
                    name: "q1",
                    isDragged:false,
                    isSelected:false,
                    x: 1000,
                    y:100,
                }
            ],
            selectedItem:undefined,
            dragItem:undefined
        }
        
        //handles drag setting
        this.setDragItem = this.setDragItem.bind(this);
        this.removeDrag = this.removeDrag.bind(this);
        this.moveChild=this.moveChild.bind(this);
        this.removeSelection = this.removeSelection.bind(this);
        // this.mouseUp=this.mouseUp.bind(this);
        // this.click = this.click.bind(this);

    }
    
    //to move a Child (mouseMove)
    moveChild(e) {
        if(this.state.dragItem) {
            console.log(e.nativeEvent.offsetX);
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
        console.log(this.state);
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
                
                />
                )
            }
        } );
        let c1 = {
            x: (1000-100)/2 + 100,
            y: (1000-100)/3 + 100
        }

        let p1 = new Point( {x:10,y:10} );
        let p2 = new Point({x:11,y:0});
        console.log(p1.rotate(-Math.PI));
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
                    <StateArc start={ {x: 200,y: 100} }  end={ {x: 100,y:500} } isSelected={true}/>
                    <StateArc start={ {x: 100,y: 100} }  end={ {x: 500,y:100} } />
                    <StateArc start={ {x: 100,y: 100} }  end={ {x: 1000,y:100} } />
                    
                    {content}
                </svg>
                
            </div>

            
        );
    }
}

export default Draw;
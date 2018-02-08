import React, { Component } from 'react';
import State from './state';

class Draw extends Component {
    constructor(props) {
        super(props);
        this.state = {x:100,y:100}
        this.move=this.move.bind(this);
        this.mouseUp=this.mouseUp.bind(this);
    }
    
    move(e) {
        this.setState({x:e.nativeEvent.offsetX,y:e.nativeEvent.offsetY});

    }
    mouseUp() {
        console.log("sds");
    }
    render() {
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
                // onMouseMove={this.move} 
                onMouseUp={this.mouseUp}>
                    <State cx={this.state.x} cy={this.state.y} text='q0'/>
                </svg>
                
            </div>

            
        );
    }
}

export default Draw;
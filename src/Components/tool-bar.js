import React, { Component } from 'react';

//const Variables
const stateSVG = <circle cx="25" cy="25" r="20" stroke="black" strokeWidth="2" fill="White" />;
const arcSVG =  <g> <path d="M 0 30 Q 25 10 50 30" stroke="black" fill="none" strokeWidth="2px" /> <polygon points="25 20 20 15 20 25" stroke="black" fill="grey"/> </g>;

class ToolBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tools: [
                {
                    mode: "DRAW",
                    content: stateSVG,
                    isActive: true,

                },
                {
                    mode: "DRAW",
                    content: arcSVG,
                    isActive: false,

                }
            ], 
            active: undefined
        };
        this.state.active = this.state.tools[0];
    }
    
    makeActive(index) {
        this.state.active.isActive = false;
        this.state.active = this.state.tools[index];
        this.state.active.isActive = true;
        this.setState({active:this.state.active});

    }

    render() {
        let content = this.state.tools.map( (item,index) => {return <ToolButton makeActive={this.makeActive.bind(this)} isActive={item.isActive} key={index} index={index}>{item.content}</ToolButton>})
        return (
            <div className="col-12 col-lg-1 container bg-light pt-lg-5 mx-auto" style={ {} }>
                {content}
            </div>
        );
    }
}

const ToolButton = (props) => {


    return (
        //selectable button 
        <button 
        className={`btn btn-light ${props.isActive?"active": " "}`}
        onClick={
            () => {
                props.makeActive(props.index);
            }
        }
        
        >
            <svg version="1.1" baseProfile="full"
                        xmlns="http://www.w3.org/2000/svg" 
                        width="50" height="50" >
                {props.children}
            </svg>
        </button>
    );
}

export default ToolBar;




import React, { Component } from 'react';
import PropTypes from 'prop-types';

//To determine the
class State extends Component {
    constructor(props) {
        super(props);
        this.state =  {select:false,drag:false} ;
        this.enableSelect = this.enableSelect.bind(this);
        this.enableDrag = this.enableDrag.bind(this);
    }

    //select the Item
    enableSelect(evt) {
        
        this.props.onClick(this.props.index);
        evt.preventDefault();
        evt.stopPropagation();

    }

    //Enable Drag
    enableDrag(evt) {
        console.log(this.props.index);
        this.props.onMouseDown(this.props.index);
        evt.preventDefault();
        evt.stopPropagation();
        
    }

    
    render() {
        return (
            <g 
            onClick={this.select}  
            onMouseDown={this.enableDrag}
            
            
            style={{cursor:'move'}} >

                <circle cx={this.props.cx} cy={this.props.cy} r="40" strokeWidth="2" stroke="black" fill="white" strokeDasharray={this.props.isSelected?"4":""}/>
                <text x={this.props.cx} y={this.props.cy} textAnchor="middle"> {this.props.text} </text>
            </g>
        );
    }
}


export default State;
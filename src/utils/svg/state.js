import React, { Component } from 'react';
import PropTypes from 'prop-types';

//To determine the
class State extends Component {
    constructor(props) {
        super(props);
        this.state =  {select:false,drag:false} ;
        this.select = this.select.bind(this);
        this.enableDrag = this.enableDrag.bind(this);
        this.disableDrag = this.disableDrag.bind(this);
    }

    //select the Item
    select(evt) {
        this.setState({select: true});
        evt.preventDefault();
        evt.stopPropagation();
    }

    enableDrag(evt) {
        this.setState({drag: true});
        console.log("enabled");
        
    }

    disableDrag(evt) {
        console.log("Disabled");
        this.setState({drag: false});
        
    }

    render() {
        return (
            <g 
            onClick={this.select}  
            onMouseDown={this.enableDrag}
            onMouseUp={this.disableDrag}
            style={{cursor:'move'}} >

                <circle cx={this.props.cx} cy={this.props.cy} r="40" strokeWidth="2" stroke="black" fill="white" strokeDasharray={this.state.select?"5,5":""}/>
                <text x={this.props.cx} y={this.props.cy} textAnchor="middle"> {this.props.text} </text>
            </g>
        );
    }
}


export default State;
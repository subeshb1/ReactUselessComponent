import React, { Component } from "react";
import PropTypes from "prop-types";

//To determine the
class State extends Component {
  constructor(props) {
    super(props);
    this.state = { select: false, drag: false };
    this.enableDrag = this.enableDrag.bind(this);
  }

  //Enable Drag
  enableDrag(evt) {
   
  
    evt.preventDefault();
    this.props.onMouseDown(this.props.index,evt);
    evt.stopPropagation();
   
  }

  render() {
    let x = this.props.cx;
    let y = this.props.cy;
    return (
      <g
        onMouseDown={this.enableDrag}
        onTouchStart={this.enableDrag}
        
        style={{ cursor: "move" }}
      >
        {this.props.isFinal ? (
          <circle
            cx={x}
            cy={y}
            r="45"
            strokeWidth="2"
            stroke="black"
            fill="white"
            strokeDasharray={this.props.isSelected ? "4" : "0"}
          />
        ) : (
          ""
        )}
        {this.props.isStart ? (
          <path
            d={`M ${x - 70} ${y - 3} ${x - 50} ${y - 3} ${x - 50} ${y -
              10}  ${x - 40} ${y}  ${x - 50} ${y + 10}  ${x - 50} ${y + 3} ${x -
              70} ${y + 3} Z`}
            stroke="black"
            strokeWidth="2"
            fill="grey"
          />
        ) : (
          ""
        )}
        <circle
          cx={x}
          cy={y}
          r={this.props.radius}
          strokeWidth="2"
          stroke="black"
          fill="white"
          strokeDasharray={this.props.isSelected ? "4" : "0"}
        />
        <text x={x} y={y} textAnchor="middle">
          {" "}
          {this.props.text}{" "}
        </text>
      </g>
    );
  }
}

State.defaultProps = {
  isStart: false,
  isFinal: false,
  radius: 40,
  onMouseDown: () =>{}
};

export default State;

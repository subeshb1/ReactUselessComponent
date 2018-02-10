import React, { Component } from 'react';
import Point from './points';

class StateArc extends Component {
    
    constructor(props) {
        super(props);
        
    }
    
    findControlPoint(start,end,invert) {

        let ctrPt = new Point({x:0,y:0});
        let t = new Point(start);
        t.x *= -1;t.y *= -1;
        
        start.translate(t);
        end.translate(t);
        let angle = start.findAngle(end);
        end.rotate(-angle);
        ctrPt.x = Math.abs(start.x - end.x)/2 + start.x;
        ctrPt.y = Math.abs(start.x - end.x)/3 + start.y;
        if(!invert)
            ctrPt.reflectX();
        ctrPt.rotate(angle);
        t.x *= -1;t.y *= -1;
        
        ctrPt.translate(t);


        return ctrPt;
        
    }
    
    

    render() {

        let start = this.props.start;
        let end = this.props.end;
        let ctrPt = this.findControlPoint(new Point(start),new Point(end), this.props.invert)
        return (
            <g>
            <path d={ ` M ${start.x} ${start.y} Q ${ctrPt.x} ${ctrPt.y} ${end.x} ${end.y}` } stroke="black" fill="transparent" strokeWidth="2px" strokeDasharray={ this.props.isSelected?"5":'' }/>
            <polygon points="200,10 250,190 160,210" stroke="black" fill="transparent" strokeWidth="2px"/>
            </g>

        );

    }
}

export default StateArc;
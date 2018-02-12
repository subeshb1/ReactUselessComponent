import React, { Component } from 'react';
import Point from './points';

class StateArc extends Component {
    
    constructor(props) {
        super(props);
        this.enableSelect = this.enableSelect.bind(this);
    }
    
    findControlPoint(start,end,ctrPt,text,invert) {

        
        let t = new Point(start);
        t.x *= -1;t.y *= -1;
        
        start.translate(t);
        end.translate(t);
        let angle = start.findAngle(end);
        end.rotate(-angle);
        if(!angle == 0) {
            ctrPt.x = Math.abs(start.x - end.x)/2 + start.x;
            ctrPt.y = Math.abs(start.x - end.x)/3 + start.y;
        } else {
            
            ctrPt.x = Math.abs(start.x - end.x)/2 + start.x;
            ctrPt.y = Math.abs(start.x - end.x)/3 + start.y;
        }

         let p1 = new Point({
             x: Math.abs(start.x - end.x) /2 + start.x,
             y: Math.abs(ctrPt.y - start.y)/2 + start.y
        });
        let p2 = new Point({
            x: p1.x-10,
            y: p1.y-10

        });
        let p3 = new Point({
            x: p1.x-10,
            y: p1.y+10

        });
        text.push(p1,p2,p3);

        if(!invert) {
            ctrPt.reflectX();
            text.forEach(pt => pt.reflectX());
        }
        ctrPt.rotate(angle);
        text.forEach(pt => pt.rotate(angle));

        t.x *= -1;t.y *= -1;
        ctrPt.translate(t);
        text.forEach(pt => pt.translate(t) );

        return angle;
        
    }
    
    enableSelect(evt) {
        this.props.onMouseDown(this.props.index);
        evt.preventDefault();
        evt.stopPropagation();
        
    }


    render() {
 
        let start = this.props.start;
        let end = this.props.end;
        let ctrPt = new Point({x:0,y:0});
        let text = [];
        let angel
        let same = (start.x == end.x && start.y==end.y);
        if(  !same ){
            
             angel= this.findControlPoint(new Point(start),new Point(end), ctrPt, text,this.props.invert)*180/Math.PI;
        }
        return (
            !same?
                <g 
             > 
                
                <path
                 d={ ` M ${start.x} ${start.y} Q ${ctrPt.x} ${ctrPt.y} ${end.x} ${end.y}` } 
                 stroke="black" fill="transparent" 
                 strokeWidth="2px" strokeDasharray={ this.props.isSelected?"5":'' }/>
                <polygon onMouseDown={this.enableSelect} 
                points={` ${text[0].x},${text[0].y},${text[1].x},${text[1].y},${text[2].x},${text[2].y} `} 
                stroke="black" fill="grey" strokeWidth="2px"/>
                <text 
                x="0" y="0"  
                transform={ Math.abs(angel) >= 140 && Math.abs(angel) <= 180? ` rotate(${angel} ${text[0].x} ${text[0].y}) translate( ${text[0].x-5},${text[0].y-30}) scale(-1 -1) `:` rotate(${angel} ${text[0].x} ${text[0].y}) translate( ${text[0].x-5},${text[0].y-20}) `} 
                textAnchor="middle">
                a,b
                </text>
            </g>
            :
            <g 
             > 
                
                <path
                 d={ ` M ${start.x} ${start.y} C ${start.x-120} ${start.y-120} ${start.x+120} ${start.y-120} ${end.x} ${end.y}` } 
                 stroke="black" fill="transparent" 
                 strokeWidth="2px" strokeDasharray={ this.props.isSelected?"5":'' }/>
                <polygon onMouseDown={this.enableSelect} 
                points={` ${start.x+5 },${start.y-90},${start.x-5},${start.y-100},${start.x-5},${start.y-80} `} 
                stroke="black" fill="grey" strokeWidth="2px"/>
                <text 
                x={start.x+5 } y={start.y-110} 
                 
                textAnchor="middle">
                a,b
                </text>
            </g>

        );

    }
}

export default StateArc;
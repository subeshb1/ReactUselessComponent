import React, { Component } from 'react';

class ToolBar extends Component {
    render() {
        return (
            <div className="col-12 col-lg-1 container bg-light pt-lg-5 mx-auto" style={ {} }>
            
               <button className="btn btn-light active p-sm -1">
               <svg height="50" width="50">
                    <circle cx="25" cy="25" r="20" stroke="black" strokeWidth="2" fill="White" />
                    </svg>
                </button>
               <button className="btn  btn-light">
               <svg version="1.1" baseProfile="full"
                    xmlns="http://www.w3.org/2000/svg" 
                    width="50" height="50" viewBox="0 0  200 200">   
                                 
                    <defs>
                    <marker id="Arrow" 
                            markerWidth="5" markerHeight="5" viewBox="-6 -6 12 12" 
                            refX="-2" refY="0" 
                            markerUnits="strokeWidth" 
                            orient="auto">
                        <polygon points="-2,0 -5,5 5,0 -5,-5" fill="black" stroke="black" stroke-width="1px"/>
                    </marker>
                    </defs>
                        
                    <path d="M 10,10 Q 100,250 180,100" stroke="black" fill="none" stroke-width="5px" marker-end="url(#Arrow)"/>

             </svg>
                </button>
            
            </div>
        );
    }
}

export default ToolBar;
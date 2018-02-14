import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Draw from '../utils/svg/draw';
import MenuBar from './menu';
import ToolBar from './tool-bar';
let tuples = {
    state:['q0','q1','q2','q3','q4'],
    alphabet:['0', '1'],
    initial:['q0'],
    final:['q0'],
    transition: {
        q0: {
            0:['q4'],
            1:['q2']
        },
        q1: {
            0:['q0'],
            1:['q3']
        },
        q2: {
            0:['q3'],
            1:['q0']
        },
        q3: {
            0:['q2'],
            1:['q1']
        },
        q4: {
            0:['q4'],
            1:['q4']
        }
    }
    
}
class Drawer extends Component {
    render() {
        return (
           
            <div style = {{background:'#e7e7e7'}}
            className="container-fluid">   

            {/* MenuBar */}
            
            <MenuBar />
            
            <div className='row  mx-auto mt-1'> 

                {/* Tools Menu */}
                {/* <div className="col-12 col-lg-1"> ds</div> */}
                <ToolBar />
                {/* Drawer */}
                <Draw tuples={tuples}/>
                {/*Settings*/}
                <div className="col-12 col-lg-2 bg-light"> ds</div>
                </div>
            </div>


        );
    }
}

Drawer.propTypes = {

};

export default Drawer;
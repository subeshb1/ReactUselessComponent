import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Draw from '../utils/svg/draw';
let tuples = {
    state:['q0','q1'],
    alphabet:['a','b'],
    
}
class Drawer extends Component {
    render() {
        return (
           
            <div style = {{background:'#e7e7e7'}}
            className="container-fluid ">   

            <nav>asdasds</nav>
            <div className='row'> 
                <div className="col-12 col-md-1"> ds</div>
                <Draw tuples={tuples}/>
                <div className="col-12 col-md-2"> ds</div>
                </div>
            </div>


        );
    }
}

Drawer.propTypes = {

};

export default Drawer;
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MenuBar extends Component {
    render() {
        return (
            
            <ul className="nav  bg-light pl-5 ">
            <li className="nav-item">
              <a className="nav-link text-dark " href="#">File</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Save</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Undo</a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#">Red</a>
            </li>
          </ul>
          
        );
    }
}

MenuBar.propTypes = {

};

export default MenuBar;
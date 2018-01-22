import PropTypes, { string } from 'prop-types';
import React from 'react';


//Nav
export const Nav = (props) => {

    function themeFinder(string) {
       
       return string.toLowerCase() === 'light' ? 'navbar-light': 'navbar-dark'
    }
    let theme = themeFinder(props.theme);
    let space = props.placement === 'fixed-top' ? <div style ={{height: 55,width:'100%'}}></div>: '';
    return (
        <div>
        <nav className={`navbar ${props.placement} navbar-expand-lg ${theme}`} style= { {background:props.color}}>
            {props.children}
        </nav>
        {space}
        </div>
    );
}
Nav.defaultProps = {
    theme: 'light',
    color: '#f8f9fa',
    children: <a className="navbar-brand" href="/">Navbar</a>

}
Nav.propTypes = {
    theme: PropTypes.string,
    color: PropTypes.string,
    placement: PropTypes.string,

}
//Nav End



//NavBrand
export const NavBrand = (props) => {
    const img = props.src ? <img src={props.src} width="30" height="30" className="d-inline-block align-top" /> : "";

    return (

        <a className="navbar-brand" href={props.link}>
             {img}
             {props.text}
        </a>
    );
};

NavBrand.defaultProps = {
    link: '/',
    text: 'NavBar',
    
}
NavBrand.protoTypes = {
    link: PropTypes.string,
    text: PropTypes.string,
    src: PropTypes.string
}

//NavBrand End


//NavToggle
export const NavToggle = (props) => {
    let dis = !props.fa ?     <span className="navbar-toggler-icon"></span>:
    <i className="fa fa-bars" aria-hidden="true"></i>;
    return (
        <button className="navbar-toggler" type="button" onClick={props.toggle}>
           {dis}
        </button>
    );
}

NavToggle.propTypes = {
    fa: PropTypes.bool,
    toggle: PropTypes.func.isRequired

}

NavToggle.defaultProps = {
    fa: true
}

//NavToggle End

//NavContent Begin
export class  NavContent extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {toggle:true}

    }

    render() {
        const collapse  = this.props.collapse ? 'collapse':'';
        console.log(collapse);
        
        return (
            <div className={ `${collapse} navbar-collapse`} id="navbarNav">
            <ul className="navbar-nav">
            <li className="nav-item active">
                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Features</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Pricing</a>
            </li>
            <li className="nav-item">
                <a className="nav-link disabled" href="#">Disabled</a>
            </li>
            </ul>
        </div>
        );
    }
}


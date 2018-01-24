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
        <button className="navbar-toggler " type="button" onClick={props.toggle}>
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
export const  NavContent = (props) => {
    
    const collapse  = props.collapse ? 'collapse':'';
    
    return (
        <div className={ `${collapse} navbar-collapse`} id="navbarNav">
            {props.children}
            
        </div>
    );
}

NavContent.defaultProps = {
    collapse: true
}
NavContent.propTypes = {
    collapse: PropTypes.bool
}


//NavContent End


export const NavLeft = (props) => {
    let child = [];
    if(props.list) {
        child = mapItems(props.list);
    }
    return (
        <ul className="navbar-nav mr-auto">
            {props.children}            
            {child}
        </ul>
    );
}

NavLeft.propTypes = {
    list: PropTypes.arrayOf(PropTypes.object)
}

export const NavRight = (props) => {
    let child = [];
    if(props.list) {
        child = mapItems(props.list);
    }
    return (
        <ul className="navbar-nav">
            {props.children}            
            {child}
        </ul>
    );
};  

NavRight.propTypes = {
    list: PropTypes.arrayOf(PropTypes.object)
}

export const NavLinkItem = (props) => {
    let ac = '';
    if(props.active)
        ac = 'active';
    return(
        <li className={`nav-item ${ac}`}>
            <a className="nav-link" href={props.link}> <i className={`fa fa-${props.fa}`} aria-hidden="true"></i>  {props.value} </a>
        </li>
    );
}

NavLinkItem.defaultProps = {
    link: '/',
    active: false
}




export class NavDropDown extends React.Component {

    constructor(props) {
        super(props);
        this.state ={show: false,cEnter:false};
        this.hide = this.hide.bind(this);
        this.toggle = this.toggle.bind(this);
    }
    hide() {
        
        if(this.state.cEnter)
            return;
        this.setState({show: false});
    }
    toggle() {
        this.setState({show: !this.state.show});
    }
    
    render() {
        let show = '';
        if(this.state.show)
            show = 'show';
        let child = [];
        if(this.props.list) {
            child = mapDropItem(this.props.list);
        }
        return (
            
            <li className="nav-item dropdown" onClick={this.toggle} onBlur={this.hide} >
                <a className="nav-link dropdown-toggle " href='javascript:void(0)'  >
                    {this.props.value}
                </a>
                <div className={` ${show} dropdown-menu `}  onMouseEnter={() => this.setState({cEnter:true})} onMouseLeave={() => this.setState({cEnter:false})}>
                    {this.props.children}
                    {child}
                </div>
            </li>
        );
    }
}





export class DropDownCollapse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {collapse:true};
        this.toggle = this.toggle.bind(this);
    }
    toggle(e) {
        e.stopPropagation() 
        this.setState({collapse:!this.state.collapse});
    }
    render() {
        let c = '';
        if(this.state.collapse)
            c = 'collapse';
        
            let child = [];
        if(this.props.list) {
            console.log('dsds');
            
            child = mapDropItem(this.props.list);
        }
        return (
            
            
            <div>
                <a href='javascript:void(0)'  className="dropdown-item dropdown-toggle" onClick={this.toggle} >{this.props.value}</a>
                <ul className={c}>
                    {this.props.children}
                    {child}
                </ul>
            </div>
        );
    }   
}


export const DropDownItem = (props) => {
    return (
        <a className="dropdown-item" href={props.link} >{props.value}</a>
    );
}
DropDownItem.defaultProps = {
    link: '/'
}

export const DropDownDivider = () =>  <div className="dropdown-divider" ></div>;




function mapDropItem(list) {
    const arr = list.map( (item,index) => {
        if(item.type == 'dropdown-item') {
            return <DropDownItem key={index} value={item.value} link={item.link}/>
        }
        else if(item.type == 'dropdown-divider') {
            return <DropDownDivider key={index}/>
        }
        else if(item.type == 'dropdown-collapse') {
            return <DropDownCollapse key={index} value={item.value} list={item.list}/>
        }
    });
    return arr;
}



function mapItems(list) {
    const arr = list.map( (item,index) => {
        if(item.type == 'link') {
            return <NavLinkItem key={index} value={item.value} link={item.link} fa={item.fa} active={item.active}/>
        }
        else if(item.type == 'dropdown') {
            return <NavDropDown key={index} value={item.value} list={item.list} />
        }
    });
    return arr;

}


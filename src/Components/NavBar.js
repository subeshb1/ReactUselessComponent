import React from 'react';

import {Nav,NavBrand,NavToggle, NavContent} from '../utils/nav-utils'
export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {collapse:true}
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState ( {collapse: !this.state.collapse});
    }
    render() {
        return(
            <Nav theme='dark' color="#a8424b" placement="fixed-top">
                <NavBrand text="Finite Automata" src="http://www.energysys.com/wp-content/uploads/2012/03/Energysys_avatar-logo-transparent-bg.png"/>
                <NavToggle toggle={this.toggle} fa={true}/>
                <NavContent collapse={this.state.collapse}/>
            </Nav>
        );
    }


}
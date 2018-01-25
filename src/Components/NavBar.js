import React from 'react';

import {
    Nav,
    NavBrand,
    NavToggle,
    NavContent,
    NavLeft,
    NavRight,
    NavLinkItem,
    NavDropDown,
    DropDownCollapse,
    DropDownDivider,
    DropDownItem 
} from '../utils/nav-utils'


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
        const store = this.props.store;
        return(
            <Nav theme={store.theme} color={store.color} placement={store.placement}>
                <NavBrand text={store.brand.text} src={store.brand.src}/>
                <NavToggle toggle={this.toggle} fa={true}/>
                <NavContent collapse={this.state.collapse}>
                    <NavLeft list={store.navLeft.list} active={this.props.active}>
                        {store.navLeft.children}
                    </NavLeft>
                    <NavRight list={store.navRight.list} active={this.props.active}>
                        {store.navRight.children}
                    </NavRight>
                </NavContent>
            </Nav>
        );
    }


}
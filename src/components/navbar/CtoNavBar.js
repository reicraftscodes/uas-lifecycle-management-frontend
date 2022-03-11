import {Nav, Navbar, NavbarBrand, NavItem, NavLink} from "reactstrap";
import React from "react";


export default class CtoNavBar extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="md">
                    <NavbarBrand href="/">Sierra Nevada Corporation</NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/parts-failure">PartsFailure</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/platform-status">Platform Status</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}


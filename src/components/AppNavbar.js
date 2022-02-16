import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    } from 'reactstrap';
import React from "react";

export default class AppNavbar extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div>
                <Navbar color="dark" light expand="md">
                    <NavbarBrand href="/">Sierra Nevada Corporation</NavbarBrand>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/">Dashboard</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/locations">Locations</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/stock-levels">Stock Levels</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/stock-lookup">Stock Lookup</NavLink>
                            </NavItem>
                        </Nav>
                </Navbar>
            </div>
        );
    }
}
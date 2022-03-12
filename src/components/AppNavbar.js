import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    } from 'reactstrap';
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../actions";
import {Link} from "react-router-dom"

const AppNavbar = () => {

    const user = useSelector((state) => state.user)

    const dispatch = useDispatch();

    const logout = () => {
        localStorage.removeItem("user")
        dispatch(logOut())
    }

    return (
        <div>
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">Sierra Nevada Corporation</NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        {
                            user.isLoggedIn &&
                                <>
                                    <NavItem>
                                        <NavLink>{user.info.username}</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink onClick={logout}>Logout</NavLink>
                                    </NavItem>
                                </>

                        }
                        {
                            !user.isLoggedIn &&
                            <NavItem>
                                <NavLink href="/login">Login</NavLink>
                            </NavItem>
                        }
                    </Nav>
            </Navbar>
        </div>
    );

}
export default AppNavbar;
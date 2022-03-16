import {Nav, Navbar, NavbarBrand, NavItem, NavLink,} from 'reactstrap';
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../actions/actions";
import {useNavigate} from "react-router-dom"

const AppNavbar = () => {

    const user = useSelector((state) => state.user)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("user");
        dispatch(logOut());
        navigate('/login');
    }


    const userRoute = [
        {
            title: "Parts Failure Time",
            path: "/cto-dashboard",
            roles: ["ROLE_USER_CTO"],
            id: "partsfailuretime",
            type: "page"
        },
        {
            title: "Platform status",
            path: "/cto-dashboard",
            roles: ["ROLE_USER_CTO"],
            id: "platform-stats",
            type: "page"
        },

        {
            title: "Common Failing Parts ",
            path: "/parts-failure",
            roles: ["ROLE_USER_CTO"],
            id: "",
            type: "page"
        },

        {
            title: "Stock Levels",
            path: "/stock-levels",
            roles: ["ROLE_USER_LOGISTIC","ROLE_USER_CTO", "ROLE_USER_COO"],
            id: "stock-levels",
            type: "page"
        },

        {
            title: "Locations",
            path: "/locations",
            roles: ["ROLE_USER_LOGISTIC","ROLE_USER_CTO", "ROLE_USER_COO"],
            id: "locations",
            type: "page"
        },

        {
            title: "Aircraft",
            path: "/user-aircraft",
            roles: ["ROLE_USER"],
            id: "locations",
            type: "page"
        },



        // You can also change the type to anchor. An example of scenario is when a user click nav link,
        // it will NOT direct to the new page, it stays on the same page and scroll it down for yo and direct you the "id" of a specific thing like
        // for an example an id tag for a specific chart, then it will take you to that chart. 
        // {
        //     title: "",
        //     path: "",
        //     roles: ["ROLE_USER_LOGISTIC"],
        //     id: "locations",
        //     type: "anchor"
        // },
    ]

    const onNavigate = (route) => {
        if(route.type === "anchor") {
            const anchor = document.querySelector("#" + route.id);
            anchor.scrollIntoView({behavior: 'smooth', block: 'center'});
        } else if (route.type === "page"){
            navigate(route.path)
        }
    }

    const links = user.isLoggedIn ? userRoute
        .filter(route => user.info.roles.some((role) => route.roles.includes(role)))
        .map(route => {
            return <NavItem>
                <NavLink onClick={() => onNavigate(route)}>{route.title}</NavLink>
            </NavItem>
        }) : <></>;

    return (
        <div>
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">Sierra Nevada Corporation</NavbarBrand>
                <Nav className="ml-auto" navbar>
                    {
                        user.isLoggedIn &&
                        <NavItem>
                            <NavLink>{user.info.username}</NavLink>
                        </NavItem>
                    }
                    {
                        !user.isLoggedIn &&
                        <NavItem>
                            <NavLink onClick={() => navigate("/login")}>Login</NavLink>
                        </NavItem>
                    }

                    {links}

                    {
                        user.isLoggedIn &&
                        <NavItem>
                            <NavLink onClick={logout}>Logout</NavLink>
                        </NavItem>
                    }

                </Nav>
            </Navbar>
        </div>
    );

}
export default AppNavbar;
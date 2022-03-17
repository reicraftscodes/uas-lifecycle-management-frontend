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

    // this is the main user navigation link you can see from the Navigation bar
    const userRoute = [
        {
            title: "",
            path: "/cto-dashboard",
            roles: ["ROLE_USER_CTO"],
            id: "partsfailuretime",
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
            title: "View Aircraft",
            path: "",
            roles: ["ROLE_USER"],
            id: "",
            type: "page"
        },

        {
            title: "Log hours",
            path: "/user-aircraft",
            roles: ["ROLE_USER"],
            id: "aircraft",
            type: "page"
        },

        {
            title: 'Aircraft',
            path: "/add-aircraft",
            roles: ["ROLE_USER_LOGISTIC"],
            id: "aircraft",
            type: "page"
        },

        {
            title: 'Parts',
            path: "/add-part",
            roles: ["ROLE_USER_LOGISTIC"],
            id: "aircraft",
            type: "page"
        },

        {
            title: "Stock Levels",
            path: "/locations",
            roles: ["ROLE_USER_LOGISTIC", "ROLE_USER_COO"],
            id: "locations",
            type: "page"
        },
        
        {
            title: 'Platform Status',
            path: "/platforms",
            roles: ["ROLE_USER_CTO", "ROLE_USER_COO", "ROLE_USER_CEO"],
            id: "",
            type: "page"
        },


        // You can also change the type to anchor. An example of scenario is when a user click nav link,
        // it will NOT direct to the new page, it stays on the same page but it will scroll down smoothly for you and direct you the "id" of a specific thing like
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
                <NavbarBrand>Sierra Nevada Corporation</NavbarBrand>
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
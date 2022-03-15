import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
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
            role: "ROLE_USER_CTO",
            id: "partsfailuretime",
            type: "anchor"
        },
        {
            title: "Platform status",
            path: "/cto-dashboard",
            role: "ROLE_USER_CTO",
            id: "platform-stats",
            type: "anchor"
        },

        {
            title: "Common Failing Parts ",
            path: "/parts-failure",
            role: "ROLE_USER_CTO",
            id: "platform-stats",
            type: "page"
        },

        // CTO, COO, LOO
        {
            title: "Stock Levels",
            path: "/stock-levels",
            role: "ROLE_USER_CTO",
            id: "stock-levels",
            type: "page"
        },

        //*CTO COO LO*/
        {
            title: "Locations",
            path: "/locations",
            role: "ROLE_USER_CTO",
            id: "locations",
            type: "page"
        },


        {
            title: "",
            path: "/locations/:location",
            role: "ROLE_USER_CTO",
            id: "locations",
            type: "page"
        }

        // unauthorised test if user can access other page
        // {
        //     title: "Platform status",
        //     path: "/cto-dashboard",
        //     role: "ROLE_USER_CEO",
        //     id: "platform-stats",
        //     type: "page"
        // }
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
        .filter(route => route.role === user.info.roles[0])
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
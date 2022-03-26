import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../actions/actions";
import {useNavigate} from "react-router-dom"
import {AppBar, MenuItem, Toolbar, Typography} from "@mui/material";
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    navigationLinks: {
        marginLeft: theme.spacing(10),
        display: "flex",
    },
    logo: {
        cursor: "pointer",
        flexGrow: "1",
    },

}));

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
            title: "",
            path: "/cto-dashboard",
            roles: ["ROLE_USER_CTO"],
            id: "partsfailuretime",
            type: "page"
        },

        {
            title: "Failure Hours",
            path: "/failing-times",
            roles: ["ROLE_USER_CTO"],
            id: "failurehours",
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
            title: 'Aircraft',
            path: "/aircraft",
            roles: ["ROLE_USER_LOGISTIC"],
            id: "aircraft",
            type: "page"
        },

        {
            title: 'Add Aircraft',
            path: "/add-aircraft",
            roles: ["ROLE_USER_LOGISTIC"],
            id: "add-aircraft",
            type: "page"
        },

        {
            title: 'Modify Aircraft',
            path: "/modify-aircraft",
            roles: ["ROLE_USER_LOGISTIC"],
            id: "",
            type: "page"
        },

        {
            title: 'Add Part',
            path: "/add-part",
            roles: ["ROLE_USER_LOGISTIC"],
            id: "add-part",
            type: "page"
        },


        {
            title: 'Assign User',
            path: "/assign-user",
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


        {
            title: 'Repair Cost Chart',
            path: "/aircraft-cost",
            roles: ["ROLE_USER_CEO"],
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
        if (route.type === "anchor") {
            const anchor = document.querySelector("#" + route.id);
            anchor.scrollIntoView({behavior: 'smooth', block: 'center'});
        } else if (route.type === "page") {
            navigate(route.path)
        }
    }

    const links = user.isLoggedIn ? userRoute
        .filter(route => user.info.roles.some((role) => route.roles.includes(role)))
        .map(route => {
            return <div key={route.id}>
                <MenuItem onClick={() => onNavigate(route)}>{route.title}</MenuItem>
            </div>
        }) : <></>;

    const classes = useStyles();

    return (
        <AppBar position="static" elevation={4}>
            <Toolbar>
                <Typography className={classes.logo} style={{textAlign: "left"}}>
                    Sierra Nevada Corporation
                </Typography>
                <div className={classes.navigationLinks}>
                    {/*{*/}
                    {/*    user.isLoggedIn &&*/}
                    {/*    <MenuItem className={classes.link}>{user.info.username}</MenuItem>*/}
                    {/*}*/}
                    {
                        !user.isLoggedIn &&
                        <MenuItem onClick={() => navigate("/login")}>Login</MenuItem>
                    }

                    {links}

                    {
                        user.isLoggedIn &&
                        <MenuItem onClick={logout}>Logout</MenuItem>
                    }
                </div>
            </Toolbar>
        </AppBar>
    );

}
export default AppNavbar;

import {Navigate} from "react-router-dom";
import React from "react";

const ProtectedRoute = ({user, roles, children}) => {
    if (!user.isLoggedIn) {
        return <Navigate to="/login" replace/>
    }

    const userMatch = user.info.roles.some((role) => roles.includes(role));

    if (!userMatch) {
        return <Navigate to="/unauthorized" replace/>

    }
    return children;

}

export default ProtectedRoute;
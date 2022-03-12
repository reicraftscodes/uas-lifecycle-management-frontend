import React, {useEffect, useState} from "react";
import * as AuthService from "../services/authService";
import CtoDashboard from "./Cto/CtoDashboard";

function Dashboard() {

    const [showUserDashboard, setUserDashboard] = useState(false);
    const [showLogisticDashboard, setLogisticDashboard] = useState(false);
    const [showCooDashboard, setCooDashboard] = useState(false);
    const [showCeoDashboard, setCeoDashboard] = useState(false);
    const [showCtoDashboard, setCtoDashboard] = useState(false);

    const [error, setError] = useState(null)
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        setCurrentUser(user)

        if (user) {
            if (user.roles.includes("ROLE_USER")) {
                setUserDashboard(true)
            } else if (user.roles.includes('ROLE_USER_LOGISTIC')) {
                setLogisticDashboard(true)
            } else if (user.roles.includes('ROLE_USER_CTO')) {
                setCtoDashboard(true)
            } else if (user.roles.includes('ROLE_USER_COO')) {
                setCooDashboard(true)
            } else if (user.roles.includes('ROLE_USER_CEO')) {
                setCeoDashboard(true)
            } else {
                setError('')
            }
        }
    }, []);

    return (
        <div>
            {currentUser ? (
                <div>
                    {showCtoDashboard && <CtoDashboard/>}
                    {error ? error : ''}
                </div>
            ) : (
                <div>Not Logged in</div>
            )}
        </div>
    );
};

export default Dashboard
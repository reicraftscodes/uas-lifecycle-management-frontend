export const getUserDashboard = (role) => {
    switch (role) {
        case "ROLE_USER_LOGISTIC":
            return '/logistics-officer/dashboard';
        case "ROLE_USER":
            return '/user-aircraft';
        case "ROLE_USER_CTO":
            return '/cto-dashboard';
        case 'ROLE_USER_CEO':
            return '/ceo-dashboard'
        case 'ROLE_USER_COO':
            return '/stock-levels'
    }
}

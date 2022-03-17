// this is where the user redirect after logging in. You can change the route path here:
export const getUserDashboard = (role) => {
    switch (role) {
        case "ROLE_USER_LOGISTIC":
            return '/logistic-dashboard';
        case "ROLE_USER":
            return '/user-dashboard';
        case "ROLE_USER_CTO":
            return '/cto-dashboard';
        case 'ROLE_USER_CEO':
            return '/ceo-dashboard';
        case 'ROLE_USER_COO':
            return '/coo-dashboard';
    }
}

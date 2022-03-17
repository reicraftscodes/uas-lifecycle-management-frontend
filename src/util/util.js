// this is where the user redirect after logging in. You can change the route path here:
export const getUserDashboard = (role) => {
    switch (role) {
        case "ROLE_USER_LOGISTIC":
            return '/logistic-dashboard';
        case "ROLE_USER":
            return '/user-aircraft';
        case "ROLE_USER_CTO":
            return '/platforms';
        case 'ROLE_USER_CEO':
            return '/ceo-dashboard';
        case 'ROLE_USER_COO':
            return '/coo-dashboard';
    }
}

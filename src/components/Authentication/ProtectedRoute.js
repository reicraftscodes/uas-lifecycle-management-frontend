import {Navigate} from "react-router-dom";

const ProtectedRoute = ({user, role, children}) => {
    if (!user.isLoggedIn) {
        return <Navigate to="/login" replace/>
    }

    if(user.info.roles[0] !== role){
        return <Navigate to="/unauthorized" replace/>
    }

    return children;

}

export default ProtectedRoute;
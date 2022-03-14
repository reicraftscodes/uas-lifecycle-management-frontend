import './App.css';
import React, {useEffect, useState} from "react";
import {Route, Routes, useNavigate} from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import StockLevels from "./pages/StockLevels";
import AppNavbar from "./components/AppNavbar";
import Locations from "./pages/Locations";
import Location from "./pages/Location";
import Drone from "./pages/Drone";
import Part from "./pages/Part";
import StockLookup from "./pages/StockLookup";
import AddPart from './pages/AddPart';
import AddAircraft from './pages/AddAircraft';
import UserAircraft from './pages/UserAircraft';
import PartsFailure from "./pages/PartsFailure";
import UserLogin from "./components/UserLogin";
import CtoDashboard from "./pages/Cto/CtoDashboard";
import {useDispatch, useSelector} from "react-redux";
import ProtectedRoute from "./components/Authentication/ProtectedRoute";
import {fetchJwtTokenError, fetchJwtTokenSuccess} from "./actions/actions";
import {getUserDashboard} from "./util/util";
import AuthService from "./services/AuthService";

function App() {

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const jwtInfo = AuthService.getCurrentUser();
        if (jwtInfo) {
            AuthService.getJwtInfo()
                .then(response => response.json())
                .then(data => {
                    dispatch(fetchJwtTokenSuccess(data));
                    navigate(getUserDashboard(data.roles[0]))
                    setLoading(false);
                })
                .catch((error) => {
                    dispatch(fetchJwtTokenError())
                    navigate('/login')
                    setLoading(false);
                });
        }
    }, []);

    if(loading) {
        return <div>Loading...</div>
    } else {
        return (
            <div className="App">
                <AppNavbar/>
                <Routes>
                    <Route path="/" element={<Dashboard/>}/>
                    <Route path="/stock-levels" element={<ProtectedRoute user={user}><StockLevels/></ProtectedRoute>}/>
                    <Route path="/locations" exact={true} element={<Locations/>}/>
                    <Route path="/locations/:location" element={<Location/>}/>
                    <Route path="/drones/:droneId" element={<Drone/>}/>
                    <Route path="/parts/:partId" element={<Part/>}/>
                    <Route path="/stock-lookup" element={<StockLookup/>}/>
                    <Route path="/add-part" element={<AddPart/>}/>
                    <Route path="/add-aircraft" element={<AddAircraft/>}/>
                    <Route path="/user-aircraft" element={<UserAircraft/>}/>
                    <Route path="/parts-failure" element={<PartsFailure/>}/>
                    <Route path="/login" element={<UserLogin/>}/>
                    <Route path="/cto-dashboard"
                           element={<ProtectedRoute user={user} role="ROLE_USER_CTO"><CtoDashboard/></ProtectedRoute>}/>
                    {/*<Route path="/cto-dashboard" element={<ProtectedRoute user={user}><CtoDashboard/></ProtectedRoute>}/>*/}
                </Routes>
            </div>
        )
    }

}

export default App;

import './App.css';
import React, {useEffect, useState} from "react";
import {Route, Routes, useNavigate} from 'react-router-dom';
import StockLevels from "./pages/StockLevels";
import AppNavbar from "./components/AppNavbar";
import Locations from "./pages/Locations";
import Location from "./pages/Location";
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
import Spinner from "./components/Spinner";
import Unauthorized from "./components/Unauthorized";
import LODashboard from "./pages/Logistic/LODashboard";
import { Chart as ChartJS } from 'chart.js/auto'
import {Platforms} from "./pages/Platforms";
import CeoDashboard from "./pages/Ceo/CeoDashboard";
import {CooDashboard} from "./pages/Coo/CooDashboard";
import {UserDashboard} from "./pages/Users/UserDashboard";
import AverageFailureTimes from "./pages/Cto/AverageFailureTimes";

import AssignAircraft from "./pages/Logistic/AssignAircraft";
import ModifyAircraft from "./pages/Logistic/ModifyAircraft";
import {AllAircraft} from "./pages/AllAircraft";
import RepairCost from "./pages/Ceo/RepairCost";
import ViewListParts from "./pages/Logistic/ViewListParts";
import ViewPartsStockLocations from "./pages/Logistic/ViewPartsStockLocations";
<<<<<<< HEAD
import AssignPartToAircraft from './pages/Logistic/AssignPartToAircraft';
=======
import ViewHistoryOrders from "./pages/Logistic/ViewHistoryOrders";
import AircraftPartCostPage from "./pages/Ceo/AircraftPartCostPage";
import AircraftRepairCostPage from "./pages/Ceo/AircraftRepairCostPage";
>>>>>>> dev

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
                    setLoading(false);
                })
                .catch((error) => {
                    dispatch(fetchJwtTokenError())
                    navigate('/login')
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <Spinner/>
    } else {
        return (
            <div className="App">
                <AppNavbar/>
                <Routes>
                    <Route path="/" element={<UserLogin/>}/>
                    <Route path="/stock-levels" element={<ProtectedRoute user={user} roles={["ROLE_USER_LOGISTIC", "ROLE_USER_COO", "ROLE_USER_CTO"]}><StockLevels/></ProtectedRoute>}/>
                    <Route path="/locations" exact={true} element={<ProtectedRoute user={user} roles={["ROLE_USER_LOGISTIC", "ROLE_USER_COO", "ROLE_USER_CTO"]}><Locations/></ProtectedRoute>}/>
                    <Route path="/locations/:location" element={<ProtectedRoute user={user} roles={["ROLE_USER_LOGISTIC", "ROLE_USER_COO", "ROLE_USER_CTO"]}><Location/></ProtectedRoute>}/>
                    {/*<Route path="/drones/:droneId" element={<Drone/>}/>*/}
                    {/*<Route path="/parts/:partId" element={<Part/>}/>*/}
                    {/*<Route path="/stock-lookup" element={<StockLookup/>}/>*/}

                    <Route path="/aircraft" element={<ProtectedRoute user={user} roles={["ROLE_USER_LOGISTIC"]}><AllAircraft/></ProtectedRoute>}/>
                    <Route path="/add-part" element={<ProtectedRoute user={user} roles={["ROLE_USER_LOGISTIC"]}><AddPart/></ProtectedRoute>}/>
                    <Route path="/add-aircraft" element={<ProtectedRoute user={user} roles={["ROLE_USER_LOGISTIC"]}><AddAircraft/></ProtectedRoute>}/>
                    <Route path="/assign-user" element={<ProtectedRoute user={user} roles={["ROLE_USER_LOGISTIC"]}><AssignAircraft/></ProtectedRoute>}/>
                    <Route path="/user-aircraft" element={<ProtectedRoute user={user} roles={["ROLE_USER"]}><UserAircraft/></ProtectedRoute>}/>
                    <Route path="/parts-failure" element={<ProtectedRoute user={user} roles={["ROLE_USER_CTO"]}><PartsFailure/></ProtectedRoute>}/>
                    <Route path="/failing-times" element={<ProtectedRoute user={user} roles={["ROLE_USER_CTO"]}><AverageFailureTimes/></ProtectedRoute>}/>

                    <Route path="/platforms" element={<ProtectedRoute user={user} roles={["ROLE_USER_CEO", "ROLE_USER_COO", "ROLE_USER_CTO"]}><Platforms/></ProtectedRoute>}/>

                    <Route path="/user-dashboard"element={<ProtectedRoute user={user} roles={["ROLE_USER"]}><UserDashboard/></ProtectedRoute>}/>
                    <Route path="/coo-dashboard" element={<ProtectedRoute user={user} roles={["ROLE_USER_COO"]}><CooDashboard/></ProtectedRoute>}/>
                    <Route path="/ceo-dashboard" element={<ProtectedRoute user={user} roles={["ROLE_USER_CEO"]}><CeoDashboard/></ProtectedRoute>}/>
                    <Route path="/cto-dashboard" element={<ProtectedRoute user={user} roles={["ROLE_USER_CTO"]}><CtoDashboard/></ProtectedRoute>}/>

                    <Route path="/logistic-dashboard" element={<ProtectedRoute user={user} roles={["ROLE_USER_LOGISTIC"]}><LODashboard/></ProtectedRoute>}/>
                    <Route path="/add-part" element={<ProtectedRoute user={user} roles={["ROLE_USER_LOGISTIC"]}><AddPart/></ProtectedRoute>}/>
                    <Route path="/add-aircraft" element={<ProtectedRoute user={user} roles={["ROLE_USER_LOGISTIC"]}><AddAircraft/></ProtectedRoute>}/>
                    <Route path="/modify-aircraft" element={<ProtectedRoute user={user} roles={["ROLE_USER_LOGISTIC"]}><ModifyAircraft/></ProtectedRoute>}/>
                    <Route path="/assign-part" element={<ProtectedRoute user={user} roles={["ROLE_USER_LOGISTIC"]}><AssignPartToAircraft/></ProtectedRoute>}/>

                    <Route path="/unauthorized" element={<Unauthorized/>}/>
                    <Route exact={true} path="/login" element={<UserLogin/>}/>

                    <Route path="/aircraft-cost" element={<ProtectedRoute user={user} roles={["ROLE_USER_CEO"]}><RepairCost/></ProtectedRoute>}/>
                    <Route path="/view-parts" exact={true} element={<ProtectedRoute user={user} roles={["ROLE_USER_LOGISTIC"]}><ViewListParts/></ProtectedRoute>}/>
                    <Route path="/view-parts/:partNumber" element={<ProtectedRoute user={user} roles={["ROLE_USER_LOGISTIC"]}><ViewPartsStockLocations/></ProtectedRoute>}/>

                    <Route path="/order-history" element={<ProtectedRoute user={user} roles={["ROLE_USER_LOGISTIC"]}><ViewHistoryOrders/></ProtectedRoute>}/>

                    <Route path="/aircraft-cost/part/:tailNumber" element={<ProtectedRoute user={user} roles={["ROLE_USER_CEO"]}><AircraftPartCostPage/></ProtectedRoute>}/>
                    <Route path="/aircraft-cost/repair/:tailNumber" element={<ProtectedRoute user={user} roles={["ROLE_USER_CEO"]}><AircraftRepairCostPage/></ProtectedRoute>}/>

                </Routes>
            </div>
        )
    }

}

export default App;

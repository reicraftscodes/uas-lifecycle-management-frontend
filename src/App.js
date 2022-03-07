import './App.css';
import React from "react";
import {Route, Routes} from 'react-router-dom';
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
import LogFlightHours from './pages/LogFlightHours';
import UserLogin from "./components/UserLogin";

class App extends React.Component {


    render() {
        return (
            <div className="App">
                <AppNavbar />
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path ="/login" element={<UserLogin/>}/>
                    <Route path="/stock-levels" element={<StockLevels />} />
                    <Route path="/locations" exact={true} element={<Locations />} />
                    <Route path="/locations/:location" element={<Location />} />
                    <Route path="/drones/:droneId" element={<Drone />} />
                    <Route path="/parts/:partId" element={<Part />} />
                    <Route path="/stock-lookup" element={<StockLookup/>} />
                    <Route path="/add-part" element={<AddPart/>} />
                    <Route path="/add-aircraft" element={<AddAircraft/>} />
                    <Route path="/user-aircraft" element={<UserAircraft/>} />
                    <Route path="/log-flight" element={<LogFlightHours/>} />
                </Routes>
            </div>
        )
    }
}

export default App;

import './App.css';
import React from "react";
import {Route, Routes} from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import StockLevels from "./pages/StockLevels";
import AppNavbar from "./components/AppNavbar";


class App extends React.Component {

    render() {
        return (
            <div className="App">
                <AppNavbar />
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/stock-levels" element={<StockLevels />}>
                </Route>
                </Routes>
            </div>
        )
    }
}

export default App;

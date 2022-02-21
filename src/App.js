import './App.css';
import React from "react";
import {Route, Routes} from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import StockLevels from "./pages/StockLevels";
import AppNavbar from "./components/AppNavbar";
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'

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

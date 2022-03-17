import React from 'react';
import {Button, Card, CardText, CardTitle} from 'reactstrap';
import {Link} from "react-router-dom";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export default class StockAlert extends React.Component {


    constructor(props) {
        super(props);
        this.state = {lowStockParts: []};
    }

    componentDidMount() {
        //fetch api used to send get request
        fetch('http://localhost:8080/parts/low-stock')
            .then(response => response.json()).then(data => {
            this.setState({lowStockParts: data})
        }).catch(error => {
            //catches error for not being able to communicate with the server and displays an alert to the user.
            alert("Server request for low stock parts failed.")
        })
    }

    render() {

        let {lowStockParts} = this.state;

        //Using dummy data temporarily.
        const alertMessage = 12;

        console.log(lowStockParts);

        const lowStock = {lowStockParts: 3, location: "Cardiff"}
        const lowStock1 = {lowStockParts: 1, location: "Bristol"}
        const lowStock2 = {lowStockParts: 2, location: "St Athen"}

        lowStockParts = [lowStock, lowStock1, lowStock2]

        const warningList = lowStockParts.map(count => {
            return (
                <div id="warningCard" key={count.location}>
                    <div id="iconDiv">
                        <WarningAmberIcon id="warningIcon"></WarningAmberIcon>
                    </div>
                    <div id="warningTextContainer">
                    <p id="warningText">{count.lowStockParts} Low stock parts at the {count.location} location</p>
                    </div>
                    <div id="buttonContainer">
                        <Link to={`/locations/${count.location}`}><Button id="view-location">View Location</Button></Link>
                    </div>
                </div>
            )
        });

        return (
            <div id="alertContainer">
                <div><h3 id="alertTitle">Stock Level Warning</h3>
                    {warningList}</div>
            </div>
    );
    }
}
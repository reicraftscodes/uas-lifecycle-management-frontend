import React from 'react';
import {Button, Card, CardText, CardTitle} from 'reactstrap';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export default class StockPopup extends React.Component {


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

        const {lowStockParts} = this.state;

        //const alertMessage = lowStockParts.length;

        //Using dummy data temporarily.
        const alertMessage = 12;

        console.log(lowStockParts);

        return (
            <Card>
                <CardTitle id="alertTitle">Stock Level Warning</CardTitle>
                <CardText>{alertMessage}</CardText>
                <Button id="view-location">View Location</Button>
                <WarningAmberIcon id="warningIcon"></WarningAmberIcon>
            </Card>

    );
    }
}
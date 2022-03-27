import React from 'react';
import {Link} from "react-router-dom";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import {Button, Grid, Paper, Typography} from "@mui/material";
import PartsService from "../services/PartsService";

export default class StockAlert extends React.Component {


    constructor(props) {
        super(props);
        this.state = {lowStockParts: []};
    }

    componentDidMount() {
        //fetch api used to send get request
        PartsService.getLowStackParts()
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
                <div id="warningCard" key={count.location} padding="10px">
                    <div id="iconDiv">
                        <WarningAmberIcon id="warningIcon"></WarningAmberIcon>
                    </div>
                    <div id="warningTextContainer">
                        <Typography variant="subtitle1" id="warningText">{count.lowStockParts} Low stock parts at
                            the {count.location} location</Typography>
                    </div>
                    <div id="buttonContainer">
                        <Link to={`/locations/${count.location}`}><Button variant="contained" style={{backgroundColor: "#004789"}} id="view-location">View
                            Location</Button></Link>
                    </div>
                </div>
            )
        });

        return (
            <Grid item xs={6}>
                <Paper elevation={3} sx={{width: "95%", m: 2, p: "3%", pt: 0,pb:0, height: "100%"}}>
                    <Typography variant="h6">Stock Level Warning</Typography>
                    {warningList}
                </Paper>
            </Grid>
        );
    }
}
import React from 'react';
import HandymanIcon from '@mui/icons-material/Handyman';
import AircraftService from "../services/AircraftService";
import {Button, Card, Grid, Paper, Typography} from "@mui/material";

export default class Repairs extends React.Component {


    constructor(props) {
        super(props);
        this.state = {needingRepair: []};
    }

    componentDidMount() {

        //fetch api used to send get request
        AircraftService.getNeedAircraftRepair()
            .then(response => response.json())
            .then(data => {
                this.setState({needingRepair: data})
            }).catch(error => {
            //catches error for not being able to communicate with the server and displays an alert to the user.
            alert("Server request for low stock parts failed." + error)
        })
    }


    render() {
        const repairMessage = this.state.needingRepair;
        const objectValue = Object.values(repairMessage);
        const iconStyle = {color: '#012C64', width: '40px', height: '40px', alignItems: 'center'}

        return (
            <Grid item xs={6}>
                <Paper elevation={3} sx={{width: "97.5%", m: 2, p: "3%", pt: 0, mb: 0, height: "100%"}}>
                    <Typography variant="h6" align="center">Repair</Typography>
                    <Typography variant="subtitle1">There are {objectValue} aircraft with parts that are in need of
                        repair</Typography>
                    <Button variant="contained" style={{backgroundColor: "#004789"}} id="view-aircraft">View Aircraft</Button>
                    <Grid item={4} container
                          direction="row"
                          justifyContent="center"
                          alignItems="center">
                        <HandymanIcon id="handymanIcon" sx={iconStyle}></HandymanIcon>
                    </Grid>
                </Paper>
            </Grid>

        );
    }
}
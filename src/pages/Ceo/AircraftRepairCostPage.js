import React, {useEffect, useState} from 'react';
import {Paper, Typography} from "@mui/material";
import AircraftPartCostTable from "./AircraftPartCostTable";
import {Container} from "@material-ui/core";
import Card from "@mui/material/Card";
import {useParams} from "react-router-dom";
import AircraftService from "../../services/AircraftService";
import AircraftRepairCostTable from "./AircraftRepairCostTable";

function AircraftRepairCostPage(props) {

    const {tailNumber} = useParams();
    const [repairs, setRepairs] = useState([]);

    useEffect(() => {
        getCeoOverallAircraftCost();
    }, [tailNumber]);

    function getTotalRepairCost(part) {
        return part.repairs.map(repair => repair.cost).reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
        );
    }

    const getCeoOverallAircraftCost = () => {
        AircraftService.getCeoOverallAircraftCost()
            .then(response => response.json())
            .then(data => {
                console.log("Successfully retrieved repair aircraft cost", data);

                const aircraft = data.aircraft.find(aircraft => aircraft.tailNumber === tailNumber);

                const repairs = [];

                aircraft.parts.forEach(part => {
                    part.repairs.forEach(repair => {
                        repairs.push(repair)
                    });
                })
                console.log(repairs);
                setRepairs(repairs)
            })
            .catch(error => {
                console.log("Error retrieving  repair aircraft cost", error);
            })
    }

    return <Container>
        <Typography p={6} variant="h5" align="left">Repair Costs</Typography>
        <Paper elevation={3} sx={{height: "100%", m: 2, p: "1%"}}>
            <Typography p={5} variant="h4" align="left">Aircraft {tailNumber} - Repairs</Typography>
            <AircraftRepairCostTable repairs={repairs}/>
        </Paper>
    </Container>
}

export default AircraftRepairCostPage;

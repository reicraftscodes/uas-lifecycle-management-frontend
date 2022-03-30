import React, {useEffect, useState} from 'react';
import {Paper, Typography} from "@mui/material";
import AircraftPartCostTable from "./AircraftPartCostTable";
import {Container} from "@material-ui/core";
import Card from "@mui/material/Card";
import {useParams} from "react-router-dom";
import AircraftService from "../../services/AircraftService";

function AircraftPartCostPage(props) {

    const {tailNumber} = useParams();
    const [repairCost, setRepairCost] = useState([]);

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
                const parts = aircraft.parts.map(part => {
                    return {
                        ...part, totalRepairCost: getTotalRepairCost(part)
                    }
                })
                setRepairCost(parts)
            })
            .catch(error => {
                console.log("Error retrieving  repair aircraft cost", error);
            })
    }

    return <Container>
        <Typography p={4} variant="h5" align="left">Part Costs</Typography>
        <Paper elevation={3} sx={{height: "100%", m: 2, p: "1%"}}>
            <Typography p={5} variant="h4" align="left">Aircraft {tailNumber} - Parts</Typography>
            <AircraftPartCostTable repairCost={repairCost}/>
        </Paper>
    </Container>
}

export default AircraftPartCostPage;

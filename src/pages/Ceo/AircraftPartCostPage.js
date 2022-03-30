import React, {useEffect, useState} from 'react';
import {Typography} from "@mui/material";
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
        <Typography p={5} variant="h3" align="left">Part Costs</Typography>
        <Card elevation={6}>
            <Typography p={5} variant="h4" align="left">Aircraft {tailNumber} - Parts</Typography>
            <AircraftPartCostTable repairCost={repairCost}/>
        </Card>
    </Container>
}

export default AircraftPartCostPage;

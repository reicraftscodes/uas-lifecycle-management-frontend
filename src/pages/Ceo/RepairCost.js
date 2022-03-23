import React, {useEffect, useState} from "react";
import AircraftService from "../../services/AircraftService";
import RepairCostTable from "./RepairCostTable";
import {Box, Grid, Paper, styled, Typography} from "@mui/material";
import RepairCostStats from "./RepairCostStats";


function RepairCost() {

    const [repairAirCraftCost, setRepairAirCraftCost] = useState([]);


    useEffect(() => {
        getCeoAircraftCost();
    }, []);

    const getCeoAircraftCost = () => {
        AircraftService.getCeoAircraftCost()
            .then(response => response.json())
            .then(data => {
                console.log("Successfully retrieved repair aircraft cost", data);
                setRepairAirCraftCost(data);
                console.log(data);
            })
            .catch(error => {
                console.log("Error retrieving  repair aircraft cost", error);
            })
    }

    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <div>
            <Typography variant="h3"> Repair Costs</Typography>
            <Box sx={1} margin="10px">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Item>
                            <RepairCostTable data={repairAirCraftCost}/>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default RepairCost;
import React, {useEffect} from 'react';
import {Divider, Grid, Paper, Typography} from "@mui/material";
import PlatformsTable from "../components/PlatformsTable";

export const Platforms = () => {

    const [platformList, setPlatformList] = React.useState([]);

    useEffect(() => {
        getPlatforms();
        console.log("use effect");
    }, []);

    const getPlatforms = () => {

        const platformData = [
            {
                location: "Cardiff",
                platformType: "Platform A",
                platformStatus: "Operational",
                aircraft: "G-001",
                flightHours: 340,
                totalPartsCost: 1500,
                totalRepairs: 13,
                totalRepairsCost: 750.20,
                totalCost: 2250.20
            },
            {
                location: "Cardiff",
                platformType: "Platform B",
                platformStatus: "Operational",
                aircraft: "G-002",
                flightHours: 260,
                totalPartsCost: 1800,
                totalRepairs: 21,
                totalRepairsCost: 700,
                totalCost: 2500
            },
            {
                location: "St Athen",
                platformType: "Platform A",
                platformStatus: "Repair",
                aircraft: "G-003",
                flightHours: 410,
                totalPartsCost: 2000,
                totalRepairs: 23,
                totalRepairsCost: 850.50,
                totalCost: 2850.50
            },
            {
                location: "St Athen",
                platformType: "Platform B",
                platformStatus: "Operational",
                aircraft: "G-004",
                flightHours: 415,
                totalPartsCost: 1700,
                totalRepairs: 15,
                totalRepairsCost: 800,
                totalCost: 2500
            }
        ]

        setPlatformList(platformData);
    }


    return (
        <div>
            <Paper elevation={3} sx={{height: "95%", m: 2, p: "1%"}}>
                <Typography sx={{ fontWeight: 'bold', fontSize: '1.5rem', paddingBottom: "10px"}}>Platforms</Typography>
                <Divider/>
                <Grid container>
                    <Grid item xs={9}>
                        <Paper elevation={3} sx={{height: "95%", m: 1, p: "1%", flexGrow: 1}}>
                            <PlatformsTable data={platformList} style={{alignSelf: "center"}}/>
                        </Paper>

                    </Grid>
                    <Grid item xs={3}>
                        <Paper elevation={3} sx={{height: "95%", m: 1, p: "1%"}}>

                        </Paper>
                    </Grid>
                </Grid>




            </Paper>


        </div>
    )

}

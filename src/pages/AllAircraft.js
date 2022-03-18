import React, {useEffect} from 'react';
import {
    Button,
    Checkbox, CircularProgress,
    Divider,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    Paper,
    Typography
} from "@mui/material";
import PlatformsTable from "../components/PlatformsTable";
import AircraftService from "../services/AircraftService";
import AllAircraftTable from "../components/AllAircraftTable";

export const AllAircraft = () => {

    const [isLoading, setLoading] = React.useState(true);
    const [aircraftList, setAircraftList] = React.useState([]);

    useEffect(() => {
        console.log("use effect");
        getAllAircraft().then(() => {
            setLoading(false);
        });
        ;
    }, []);

    const getAllAircraft = async () => {
        console.log("get aircraft");
        const res = await AircraftService.getAllAircraft()
            .then(response => response.json())
            .then(data => {
                console.log("Successfully retrieved all aircraft: ", data);
                setAircraftList(data);
            })
            .catch(error => {
                console.log("Error when retrieving all aircraft: ", error);
            })
    }

    if (isLoading) {
        return (
            <CircularProgress style={{margin: "40px"}}/>
        )
    }
    return (
        <div>
            <Paper elevation={3} sx={{height: "95%", m: 2, p: "1%"}}>
                <Typography sx={{ fontWeight: 'bold', fontSize: '1.5rem', paddingBottom: "10px"}}>All Aircraft</Typography>
                <Divider style={{marginBottom: "10px"}}/>
                <Grid container>
                    <Grid item xs={7}>

                        <Paper elevation={1} sx={{height: "100%", m: 1, p: "1%", flexGrow: 1}}>
                            <AllAircraftTable data={aircraftList} style={{alignSelf: "center"}}/>
                        </Paper>

                    </Grid>
                </Grid>



            </Paper>
        </div>
    )

}

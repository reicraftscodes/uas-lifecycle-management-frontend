import React, {useEffect} from 'react';
import {
    Button,
    Checkbox,
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

export const Platforms = () => {

    const [platformList, setPlatformList] = React.useState([]);
    //const [locationList, setLocationList] = React.useState([]);
    const [locationFilterList, setLocationFilterList] = React.useState({});

    useEffect(() => {
        getPlatforms();
        getLocations();
        console.log("use effect");
    }, []);

    const getPlatforms = () => {

        AircraftService.getPlatformStatus()
            .then(response => response.json())
            .then(data => {
                console.log("Successfully retrieved platform statuses: ", data);
                setPlatformList(data);
            })
            .catch(error => {
                console.log("Error when retrieving platform statuses: ", error);
            })
    }

    //todo - get this from api
    const getLocations = () => {

        const locations = ["Ankara", "Cardiff", "Dublin", "Edinburgh", "London", "Nevada", "St Athen", "Manchester"];
        const locationFilter = locations.reduce((o, key) => ({ ...o, [key]: false}), {})
        console.log(locationFilter);

        setLocationFilterList(locationFilter);
    }

    const handleChangeFilter = (event) => {
        setLocationFilterList({
            ...locationFilterList,
            [event.target.name]: event.target.checked,
        });
    };

    return (
        <div>
            <Paper elevation={3} sx={{height: "95%", m: 2, p: "1%"}}>
                <Typography sx={{ fontWeight: 'bold', fontSize: '1.5rem', paddingBottom: "10px"}}>Platforms</Typography>
                <Divider/>
                <Grid container>
                    <Grid item xs={10}>
                        <Paper elevation={3} sx={{height: "95%", m: 1, p: "1%", flexGrow: 1}}>
                            <PlatformsTable data={platformList} style={{alignSelf: "center"}}/>
                        </Paper>

                    </Grid>
                    <Grid item xs={2}>
                        <Paper elevation={3} sx={{height: "95%", m: 1, p: "1%", display: 'flex', flexDirection: 'column'}}>
                            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                                <FormLabel component="legend">Location</FormLabel>
                                <FormGroup>
                                    {Object.keys(locationFilterList).map((key, i) => (
                                        <FormControlLabel
                                            control={
                                                <Checkbox checked={locationFilterList[key]} onChange={handleChangeFilter} name={key} />
                                            }
                                            label={key}
                                        />
                                    ))}

                                </FormGroup>
                            </FormControl>
                            <Button>Filter</Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )

}

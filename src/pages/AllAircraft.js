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
    const [locationFilterList, setLocationFilterList] = React.useState({});
    const [platformStatusFilterList, setPlatformFilterList] = React.useState({});

    useEffect(() => {
        console.log("use effect");
        getAllAircraft().then(() => {
            setLoading(false);
        });
        getLocations();
        getPlatformStatusOptions();
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

    //todo - get this from api
    const getLocations = () => {

        const locations = ["Ankara", "Cardiff", "Dublin", "Edinburgh", "London", "Nevada", "St Athen", "Manchester"];
        const locationFilter = locations.reduce((o, key) => ({...o, [key]: true}), {})
        console.log(locationFilter);

        setLocationFilterList(locationFilter);
    }

    //todo - get this from api
    const getPlatformStatusOptions = () => {

        const platformStatusOptions = ["Design", "Production", "Operational", "Repair"];
        const platformStatusFilter = platformStatusOptions.reduce((o, key) => ({...o, [key]: true}), {})
        console.log(platformStatusFilter);

        setPlatformFilterList(platformStatusFilter);
    }

    const handleChangeLocationFilter = (event) => {
        setLocationFilterList({
            ...locationFilterList,
            [event.target.name]: event.target.checked,
        });
    };

    const handleChangePlatformStatusFilter = (event) => {
        setPlatformFilterList({
            ...platformStatusFilterList,
            [event.target.name]: event.target.checked,
        });
    };

    const filter = () => {
        const locations = [];
        const platformStatusOptions = []
        Object.keys(locationFilterList).forEach(function (locationKey, i) {
            if (locationFilterList[locationKey]) {
                locations.push(locationKey);
            }
        });
        console.log("locations: " + locations);
        Object.keys(platformStatusFilterList).forEach(function (platformStatusKey, i) {
            if (platformStatusFilterList[platformStatusKey]) {
                platformStatusOptions.push(platformStatusKey);
            }
        });
        console.log("platform statuses: " + platformStatusOptions);
        let request = {
            locations: locations,
            platformStatuses: platformStatusOptions
        }
        postAircraftFilterRequest(request);
    };

    const postAircraftFilterRequest = (myData) => {
        console.log("post filter platforms");
        AircraftService.getFilteredAircraft(myData)
            .then(response => response.json())
            .then(data => {
                console.log("Successfully retrieved filtered aircraft: ", data);
                setAircraftList(data);
            })
            .catch(error => {
                console.log("Error when retrieving filtered aircraft: ", error);
            })
    };

    if (isLoading) {
        return (
            <CircularProgress style={{margin: "40px"}}/>
        )
    }
    return (
        <div>
            <Paper elevation={3} sx={{height: "95%", m: 2, p: "1%"}}>
                <Typography sx={{fontWeight: 600, fontSize: '1.5rem', paddingBottom: "10px"}}>All Aircraft</Typography>
                <Divider style={{marginBottom: "10px"}}/>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <div>

                        <Paper elevation={1} sx={{height: "100%", m: 1, p: "1%", flexGrow: 1}}>
                            <AllAircraftTable data={aircraftList} style={{alignSelf: "center"}}/>
                        </Paper>

                    </div>
                    <div style={{minWidth: "250px"}}>
                        <Paper elevation={3} sx={{
                            height: "100%",
                            m: 1,
                            p: "1%",
                            display: 'flex',
                            flexDirection: 'column',
                            marginBottom: "25px"
                        }}>
                            <FormControl sx={{m: 3}} component="fieldset" variant="standard">
                                <FormLabel component="legend">Location</FormLabel>
                                <FormGroup>
                                    {Object.keys(locationFilterList).map((key, i) => (
                                        <FormControlLabel
                                            style={{fontSize: "10px"}}
                                            key={key}
                                            control={
                                                <Checkbox checked={locationFilterList[key]}
                                                          onChange={handleChangeLocationFilter} name={key}/>
                                            }
                                            label={<Typography style={{fontSize: "13px"}}>{key}</Typography>}
                                        />
                                    ))}

                                </FormGroup>
                            </FormControl>
                            <Divider style={{marginLeft: "10px", marginRight: "5px"}}/>
                            <FormControl sx={{m: 3}} component="fieldset" variant="standard">
                                <FormLabel component="legend">Platform Status</FormLabel>
                                <FormGroup>
                                    {Object.keys(platformStatusFilterList).map((key, i) => (
                                        <FormControlLabel
                                            style={{fontSize: "10px"}}
                                            key={key}
                                            control={
                                                <Checkbox checked={platformStatusFilterList[key]}
                                                          onChange={handleChangePlatformStatusFilter} name={key}/>
                                            }
                                            label={<Typography style={{fontSize: "13px"}}>{key}</Typography>}
                                        />
                                    ))}

                                </FormGroup>
                            </FormControl>
                            <Divider style={{marginLeft: "10px", marginRight: "5px"}}/>
                            <Button style={{margin: "20px", backgroundColor: "#004789"}} variant="contained"
                                    onClick={() => filter()}>Filter</Button>
                        </Paper>
                    </div>
                </div>


            </Paper>
        </div>
    )

}

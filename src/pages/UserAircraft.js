import React, {useEffect, useState} from 'react';
import {
    Card,
    Stack,
    ListItem,
    ListItemText,
    List,
    Divider,
    Typography,
    CardContent,
    Paper,
    Autocomplete,
    TextField,
    FormControl,
    Button,
    Grid,
    Alert
} from '@mui/material';
import AircraftService from "../services/AircraftService";
import AuthService from "../services/AuthService";
import '../css/alertStyling.css'

const UserAircraft = () => {

    //array of aircraft fetched for a user.
    const [aircrafts, setAircrafts] = useState([]);
    const [isLoading, setLoading] = React.useState(true);
    //array of aircraft tailnumber fetched for user.
    const [aircraftTailNumbers, setAircraftTailNumbers] = useState([]);

    const [aircraft, setAircraft] = useState("");
    const [flyTime, setFlightHours] = useState("");

    //used for alearts. alert is for toggling alert visibility, alert message for message, alert severity for colour of alert.
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');

    //runs on render
    useEffect(() => {
        getUserAircraft().then(() => {
            setLoading(false);
        });
    }, []);

    const getUserAircraft = async () => {
        const userId = AuthService.getCurrentUser().id;
        console.log("User id: " + userId);
        //gets the user aircraft and stores them in variables, the getUserAircraft() takes an id that would later need to be added when login is finished but currently is hardcoded.
        const res = await AircraftService.getUserAircraft(userId)
             .then(response => response.json())
             .then(data => {
                console.log("Successfully retrieved user aircraft data: " + data);
                 for(let i = 0; i < data.length; i++){
                    aircraftTailNumbers[i] = data[i].tailNumber;
                    aircrafts[i] = data[i];
                 }
         });
    }

    const onFlightHoursSubmit = () => {
        const userId = AuthService.getCurrentUser().id;
        //takes user inputs and makes them into json for the post request.
        const request = {userId, aircraft,flyTime};

        //This block validates the fields and if any are empty of invalid shows an alert message
        if (aircraft == ""){
            setAlertMessage("Aircraft field cannot be blank.");
            setAlertSeverity("error");
            setAlert(true);
            //hides the alert message after 3 seconds
            setTimeout(() => { setAlert(false) }, 3000);
        } else if (flyTime == "" || flyTime < 0){
            setAlertMessage("Flight hours cannot be blank or negative.");
            setAlertSeverity("error");
            setAlert(true);
            setTimeout(() => { setAlert(false) }, 3000);
        } else {
            AircraftService.setAircraftFlytime(request).then(data => {
                //if the request is successful an alert is shown with a success message
                setAlertMessage("Flight hours logged!");
                setAlertSeverity("success");
                setAlert(true);
                getUserAircraft();
                //hides the alert after displaying for 3 seconds
                setTimeout(() => { setAlert(false) }, 3000);
            }).catch(error => {
                //catches error for not being able to communicate with the server and displays an alert to the user.
                setAlertMessage("Error communicating with server, hours not logged");
                setAlertSeverity("error");
                setAlert(true);
                setTimeout(() => { setAlert(false) }, 3000);
            });
        }

    }
    if (isLoading) {
        return (
            <div/>
        )
    }

    return (
        <div id="userAircraft">
            <div className="alertPos">
                {alert ? <Alert severity={alertSeverity}>{alertMessage}</Alert> : <></> }
            </div>

            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Paper elevation={3} sx={{width: "100%",height: "90%", m: 2, p: "1%", pt: "2%" }}>
                        <Typography sx={{ fontWeight: 'bold', marginTop: '10px', fontSize: '1.5rem', pt: 3}}>Log Flight Hours</Typography>
                        <br/>
                        <FormControl>
                            <Autocomplete options={aircraftTailNumbers} onChange={(event, newValue) => {setAircraft(newValue)}} renderInput={(params) => (
                                <TextField {...params} label="Aircraft" variant="outlined" />
                            )} />
                            <br/>
                            <Divider/>
                            <br/>
                            <TextField label="Flight Hours" type="number" onChange={(e) => setFlightHours(e.target.value)}></TextField>
                            <br/>
                            <Divider/>
                            <br/>
                            <Button style={{marginBottom: "25px"}} variant="contained" onClick={onFlightHoursSubmit}>Submit</Button>
                        </FormControl>
                    </Paper>
                </Grid>

                <Grid item xs={8}>
                    <Paper elevation={3} sx={{width: "97%",height: "90%", m: 2, p: "1%", pt: "0%" }}>
                        {aircrafts.length > 0 ? (
                            <Stack direction="row" spacing={5} justifyContent="flex-start" sx={{ m: 2,mt: 2, alignItems: 'center'}}>
                                {aircrafts.map((row, index) => (
                                    <Card key={row.tailNumber} sx={{ width: '40%', maxWidth: 340, minWidth: 360, bgcolor: 'background.paper', marginTop: 2, marginBottom: 2}}>
                                        <CardContent>
                                            <Typography sx={{ fontWeight: 'bold', marginTop: '10px', fontSize: '1.5rem'}}>Assigned Aircraft {index+1}</Typography>
                                            <List sx={{ maxWidth: 360, bgcolor: 'background.paper'}}>
                                                <ListItem>
                                                    <ListItemText sx={{ width: '50%', minWidth: '150px'}}>Tail number:</ListItemText>
                                                    <ListItemText sx={{ width: '50%', minWidth: '150px'}}>{row.tailNumber}</ListItemText>
                                                </ListItem>
                                                <Divider />
                                                <ListItem>
                                                    <ListItemText sx={{ width: '50%', minWidth: '150px'}}>Location:</ListItemText>
                                                    <ListItemText sx={{ width: '50%', minWidth: '150px'}}>{row.location}</ListItemText>
                                                </ListItem>
                                                <Divider />
                                                <ListItem>
                                                    <ListItemText sx={{ width: '50%', minWidth: '150px'}}>Platform:</ListItemText>
                                                    <ListItemText sx={{ width: '50%', minWidth: '150px'}}>{row.platformType}</ListItemText>
                                                </ListItem>
                                                <Divider />
                                                <ListItem>
                                                    <ListItemText sx={{ width: '50%', minWidth: '150px'}}>Platform status:</ListItemText>
                                                    <ListItemText sx={{ width: '50%', minWidth: '150px'}}>{row.platformStatus}</ListItemText>
                                                </ListItem>
                                                <Divider />
                                                <ListItem>
                                                    <ListItemText sx={{ width: '50%', minWidth: '150px'}}>Total flight time:</ListItemText>
                                                    <ListItemText sx={{ width: '50%', minWidth: '150px'}}>{row.totalAircraftFlyingHours}h</ListItemText>
                                                </ListItem>
                                                <Divider />
                                                <ListItem>
                                                    <ListItemText sx={{ width: '50%', minWidth: '150px'}}>Your flight time:</ListItemText>
                                                    <ListItemText sx={{ width: '50%', minWidth: '150px'}}>{row.userAircraftFlyingHours}h</ListItemText>
                                                </ListItem>
                                            </List>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Stack>
                        ) : (
                            <div style={{height: "100%", alignItems: "center", display: "flex", justifyContent: "center"}}>
                                <Typography>There are no aircraft assigned to you.</Typography>
                            </div>
                        )}

                    </Paper>
                </Grid>
            </Grid>
        </div>

    );}
export default UserAircraft;


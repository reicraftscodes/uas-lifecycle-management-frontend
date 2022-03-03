import {Autocomplete, Button, Select,TextField, FormControl, Paper, Alert, Divider} from "@mui/material";
import React, { useEffect, useState } from 'react';
import '../css/AddPart.css'

const LogFlightHours = () => {
    //const aircrafts = [];
    const [aircrafts, setAircrafts] = useState([]);
    const [aircraft, setAircraft] = useState("");
    const [flyTime, setFlightHours] = useState("");

    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');

    useEffect(() => {
        fetch('http://localhost:8080/aircraft/user/2', {
            method: 'GET',
            headers: {"Content-Type": "application/json" }
        }).then(response => response.json()).then(data => {
            for(let i = 0; i < data.length; i++){
                aircrafts[i] = data[i].tailNumber;
            }
        });
    }, []);

    const onSubmit = () => {

        const request = {aircraft,flyTime};

        if (aircraft == ""){
            setAlertMessage("Aircraft field cannot be blank.");
            setAlertSeverity("error");
            setAlert(true);
            setTimeout(() => { setAlert(false) }, 3000);
        } else if (flyTime == "" || flyTime < 0){
            setAlertMessage("Flight hours cannot be blank or negative.");
            setAlertSeverity("error");
            setAlert(true);
            setTimeout(() => { setAlert(false) }, 3000);
        } else {
            fetch('http://localhost:8080/aircraft/log-flight', {
                method: 'POST',
                headers: {"Content-Type": "application/json" },
                body: JSON.stringify(request)
            }).then(data => {
                //if the request is successful an alert is shown with a success message
                setAlertMessage("Flight hours logged!");
                setAlertSeverity("success");
                setAlert(true);
                //hides the alert after displaying for 3 seconds
                setTimeout(() => { setAlert(false) }, 3000);
            }).catch(error => { 
                //catches error for not being able to communicate with the server and displays an alert to the user.
                setAlertMessage("Error communicating with server, part not saved");
                setAlertSeverity("error");
                setAlert(true);
                setTimeout(() => { setAlert(false) }, 3000);
            });
        }

    }

    return (
        <div className="body">
            <Paper elevation={3} sx={{width: "65%", margin: "auto", p: "3%", pt: "0%", mt: "1%" }}>
                    <div className="alertPos">
                        {alert ? <Alert severity={alertSeverity}>{alertMessage}</Alert> : <></> }
                    </div> 
                <h1>Log Flight Hours</h1>
                <Divider/>
                <br/>
                <FormControl>
                    <Autocomplete options={aircrafts} onChange={(event, newValue) => {setAircraft(newValue)}} renderInput={(params) => (
                        <TextField {...params} label="Aircraft" variant="outlined" />
                    )} />
                    <br/>
                    <Divider/>
                    <br/>
                    <TextField label="Flight Hours" type="number" onChange={(e) => setFlightHours(e.target.value)}></TextField>
                    <br/>
                    <Divider/>
                    <br/>
                    <Button variant="contained" onClick={onSubmit}>Submit</Button>
                </FormControl>
            </Paper>
            



            



        </div>

        
    )  
}




export default LogFlightHours
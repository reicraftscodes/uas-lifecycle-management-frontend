import {Autocomplete, Button, Select,TextField, FormControl} from "@mui/material";
import React, { useEffect, useState } from 'react';

const LogFlightHours = () => {
    const aircrafts = [];
    const [aircraft, setAircraft] = useState("");
    const [flightHours, setFlightHours] = useState("");

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
        console.log(aircraft);
        console.log(flightHours);
    }



    return (
        <div className="body">
            <h1>Log Flight Hours</h1>

            <FormControl>
                <Autocomplete options={aircrafts} onChange={(event, newValue) => {setAircraft(newValue)}} renderInput={(params) => (
                    <TextField {...params} label="Aircraft" variant="outlined" />
                )} />

                <TextField label="Flight Hours" type="number" onChange={(e) => setFlightHours(e.target.value)}></TextField>

                <Button variant="contained" onClick={onSubmit}>Submit</Button>
            </FormControl>

            



        </div>

        
    )  
}




export default LogFlightHours
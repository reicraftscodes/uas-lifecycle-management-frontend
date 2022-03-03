import {Button} from "@mui/material";
import React, { useEffect } from 'react';

const LogFlightHours = () => {

    useEffect(() => {
        const aircraft = [];

        fetch('http://localhost:8080/aircraft/user/2', {
            method: 'GET',
            headers: {"Content-Type": "application/json" }
        }).then(response => response.json()).then(data => {
            for(let i = 0; i < data.length; i++){
                aircraft[i] = data[i].tailNumber;
            }

        });

        console.log(aircraft);
        

    }, []);



    return (
        <div className="body">
            <h1>Log Flight Hours</h1>
            <Button>Click</Button>
        </div>

        
    )  
}




export default LogFlightHours
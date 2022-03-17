
import {Paper, Button, TextField, FormControl} from "@mui/material";
import React, {useState} from "react";
import AircraftService from "../../services/AircraftService";

const ModifyAircraft = () => {

    const [tailNumber, setTailNumber] = useState("");
    const[parts, setParts] = useState([[]]);

    const onAircraftSearch = (e) => {
        console.log(tailNumber);
        AircraftService.getAircraftPartsStatus(tailNumber).then(response => response.json()).then(data => {
            setParts(data.parts);
            
        });
        console.log(parts);
    }

    return (
        <div>
            <Paper elevation={3} sx={{width: "95%", margin: "auto", p: "3%", pt: "0%", mt: 2 }}>
                <h1>Modify Aircraft</h1>
                <FormControl>
                    <TextField label="Aircraft tailnumber" onChange={(e) => setTailNumber(e.target.value)} ></TextField>
                    <br/>
                    <Button variant="contained" onClick={onAircraftSearch}>Search Aircraft</Button>
                </FormControl>

                <p>{parts[0][1]}</p>


            </Paper>
            



        </div>
    );
}
export default ModifyAircraft;
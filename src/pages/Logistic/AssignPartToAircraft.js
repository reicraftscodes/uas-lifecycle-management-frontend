import {Button, Alert, Paper, FormControl, TextField, Container, Divider} from "@mui/material";
import React, {useState} from "react";
import AircraftService from "../../services/AircraftService";

const AssignPartToAircraft = () => {
    const[tailNumber, setTailNumber] = useState("");
    const[newPartNumber, setPartID] = useState("");

    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');

        const assignPart = () => {
            const request ={tailNumber,newPartNumber};

            AircraftService.updateAircraftPart(request).then(response => {
                if (response.status == 400) {
                    setAlertSeverity("error");
                    setAlertMessage("Part already assigned to aircraft!")
                    setAlert(true);
                    setTimeout(() => { setAlert(false) }, 3000);
                } else if (response.status == 404) {
                    setAlertSeverity("error");
                    setAlertMessage("Please check partID or Aircraft Tailnumber!")
                    setAlert(true);
                    setTimeout(() => { setAlert(false) }, 3000);
                } else if (response.status == 200) {
                    setAlertSeverity("success");
                    setAlertMessage("Part assigned successfully!")
                    setAlert(true);
                    setTimeout(() => { setAlert(false) }, 3000);
                } else {
                    setAlertSeverity("error");
                    setAlertMessage("Error communicating with server!")
                    setAlert(true);
                    setTimeout(() => { setAlert(false) }, 3000);
                }
            });
        }

    return (
        <div>
            <div>
                {alert ? <Alert sx={{mb: 2}} className="alertPos" severity={alertSeverity}>{alertMessage}</Alert> : <></> }
            </div>
            
            <Paper elevation={3} sx={{width: "60%", m: "auto", p: "3%", mt: 1}}>
                <h3>Assign Part To Aircraft</h3>
                <Divider></Divider>
                <br/>
                <FormControl>
                    <TextField label="PartID" onChange={(e) => setPartID(e.target.value)} ></TextField>
                    <br/>
                    <TextField label="Aircraft tailnumber" onChange={(e) => setTailNumber(e.target.value)} ></TextField>
                    <br/>
                    <Button style={{backgroundColor: "#004789"}} variant="contained" onClick={assignPart} sx={{mt: 2}}>Assign Part</Button>
                </FormControl>
            </Paper>
        </div>
    );
}

export default AssignPartToAircraft;
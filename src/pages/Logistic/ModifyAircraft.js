
import {Paper, Button, TextField, FormControl, TableRow, TableCell, TableContainer, Table, TableHead, TableBody, Grid, MenuItem, Select, InputLabel,Autocomplete, Alert} from "@mui/material";
import React, {useState} from "react";
import AircraftService from "../../services/AircraftService";
import PartService from "../../services/PartsService";

const ModifyAircraft = () => {
    const[tailNumber, setTailNumber] = useState("");
    const[parts, setParts] = useState([[]]);
    const[aircraftStatus, setAircraftStatus] = useState("");
    const[status, setStatus] = useState("DESIGN");
    const[newPartNumber, setPartNumber] = useState();
    const[availableParts, setAvailableParts] = useState([""]);
    const[display, setDisplay] = useState("none");
 
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');

    const partCategories = ["Wing A","Wing B","Fuselage","Tail","Propeller","Motor","Communications Radio","Payload Electo Optical","Payload Infra-Red","Quad Arm","Gimble"];
    const partsWithIds = [
        {"id":1,"name":"Wing A"},
        {"id":2,"name":"Wing B"},
        {"id":3,"name":"Fuselage"},
        {"id":4,"name":"Tail"},
        {"id":5,"name":"Propeller"},
        {"id":6,"name":"Motor"},
        {"id":7,"name":"Communications Radio"},
        {"id":8,"name":"Payload Electo Optical"},
        {"id":9,"name":"Payload Infra-Red"},
        {"id":10,"name":"Quad Arm"},
        {"id":11,"name":"Gimble"}
    ];

    const onAircraftSearch = (e) => {
        AircraftService.getAircraftPartsStatus(tailNumber)
        .then(response => {
            console.log(response.status);
            if (!response.ok){
                if (response.status == "404"){
                    setAlertSeverity("error");
                    setAlertMessage("Aircraft not found!")
                    setAlert(true);
                    setTimeout(() => { setAlert(false) }, 3000);
                } else if (response.status == "400"){
                    setAlertSeverity("error");
                    setAlertMessage("Aircraft field cannot be blank!")
                    setAlert(true);
                    setTimeout(() => { setAlert(false) }, 3000);
                }
            } else {
                return response;
            }
        })
        .then(response => response.json())
        .then(data => {
            setParts(data.parts);
            setAircraftStatus("Aircraft status: "+data.status);
            setDisplay("block");  
        }).catch(error =>{
            if(error.message.includes("Failed to fetch")) {
                setAlertSeverity("error");
                setAlertMessage("Error communicating with the server!")
                setAlert(true);
                setTimeout(() => { setAlert(false) }, 3000);
            }
        });
        
    }

    const updateStatus = (e) => {
        const request = {tailNumber,status};
        console.log(request);
        AircraftService.updateAircraftStatus(request).then(() => {
            onAircraftSearch();
        });
    }

    const getAvailableParts = (partType) => {
        if(partType!=null){
            PartService.getAvailablePartsByType(partsWithIds.find(part => part.name === partType).id)
                .then(response => response.json()).then(data => {
                    setAvailableParts(data);
                }); 
        }
    }

    const updatePart = () => {
        console.log(availableParts);
        console.log(newPartNumber);

        if (availableParts.includes(newPartNumber)){
            let request = {tailNumber,newPartNumber};
            console.log(request);
            AircraftService.updateAircraftPart(request).then(() => {
                onAircraftSearch();
            });
        } else {
            console.log(false);
        }
    }

    return (
        <div>
            {alert ? <Alert className="alertPos" severity={alertSeverity}>{alertMessage}</Alert> : <></> }
            <Grid container>
                <Grid item xs={6}>
                    <Paper elevation={3} sx={{width: "97.5%", m: 2, p: "3%", pt: 0, mb: 0}}>
                        <h5>Search for Aircraft</h5>
                        <FormControl>
                            <TextField label="Aircraft tailnumber" onChange={(e) => setTailNumber(e.target.value)} ></TextField>
                            <br/>
                            <Button style={{backgroundColor: "#004789"}} variant="contained" onClick={onAircraftSearch}>Search Aircraft</Button>
                        </FormControl>
                    </Paper>

                    <Grid container>
                        <Grid item xs={6}>
                            <Paper elevation={3} sx={{width: "95%", m: 2, p: "3%", pt: 0,pb:0, height: "100%", display: {display}}}>
                                <h5>Set Aircraft Status</h5>
                                <br/>
                                <FormControl>
                                    <InputLabel id="setStatusLabel">Aircraft Status</InputLabel>
                                    <Select labelId="setStatusLabel" value={status} onChange={(e) => setStatus(e.target.value)}>
                                        <MenuItem value="DESIGN">Design</MenuItem>
                                        <MenuItem value="PRODUCTION">Production</MenuItem>
                                        <MenuItem value="OPERATION">Operational</MenuItem>
                                        <MenuItem value="REPAIR">Repair</MenuItem>
                                    </Select>

                                    <Button style={{backgroundColor: "#004789"}} variant="contained" onClick={updateStatus} sx={{mt: 8}}>Update Status</Button>
                                </FormControl>
                            </Paper>
                        </Grid>

                        <Grid item xs={6}>
                            <Paper elevation={3} sx={{width: "95%", m: 2, p: "3%", pt: 0,pb:0, height: "100%", display: {display}}}>
                                <h5>Assign Part</h5>
                                <Autocomplete onChange={(event, newValue) => {getAvailableParts(newValue);}} options={partCategories} renderInput={(params) => <TextField {...params} label="Part Type" />}/>
                                <br/>
                                <Autocomplete onChange={(event, newValue) => {setPartNumber(newValue);}} options={availableParts} renderInput={(params) => <TextField {...params} label="Part Number" />}/>

                                <Button style={{backgroundColor: "#004789"}} variant="contained" onClick={updatePart} sx={{mt: 2}}>Assign</Button>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={6}>
                    <Paper elevation={3} sx={{width: "95%", m: 2, p: "3%", pt: 0, height: "91%"}}>
                        <h5>Displayed Aircraft</h5>
                        <p>{aircraftStatus}</p>
                        <TableContainer sx={{width: "100%"}}>
                                <Table size="small" aria-label="table label">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Part Number</TableCell>
                                            <TableCell>Part Name</TableCell>
                                            <TableCell>Part Status</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {parts.map((row) => (
                                            <TableRow key={row}>
                                                <TableCell sx={{fontSize: "0.7rem"}}>{row[0]}</TableCell>
                                                <TableCell sx={{fontSize: "0.7rem"}}>{row[1]}</TableCell>
                                                <TableCell sx={{fontSize: "0.7rem"}}>{row[2]}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
            
        </div>
    );
}
export default ModifyAircraft;
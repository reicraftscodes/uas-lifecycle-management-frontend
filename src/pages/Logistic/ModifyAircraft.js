
import {Paper, Button, TextField, FormControl, TableRow, TableCell, TableContainer, Table, TableHead, TableBody, Grid, MenuItem, Select, InputLabel,Autocomplete} from "@mui/material";
import React, {useState} from "react";
import AircraftService from "../../services/AircraftService";
import PartService from "../../services/PartsService";

const ModifyAircraft = () => {

    const [tailNumber, setTailNumber] = useState("");
    const[parts, setParts] = useState([[]]);
    const[aircraftStatus, setAircraftStatus] = useState("");
    const[status, setStatus] = useState("DESIGN");
    const[partNumber, setPartNumber] = useState();

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

    const[availableParts, setAvailableParts] = useState([""]);


    const onAircraftSearch = (e) => {
        console.log(tailNumber);
        AircraftService.getAircraftPartsStatus(tailNumber).then(response => response.json()).then(data => {
            setParts(data.parts);
            setAircraftStatus("Aircraft status: "+data.status);
            
            
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
        //console.log(partType);
        //let obj = partsWithIds.find(part => part.name === partType);
        //console.log(obj);
        
        if(partType!=null){
            PartService.getAvailablePartsByType(partsWithIds.find(part => part.name === partType).id)
                .then(response => response.json()).then(data => {
                    setPartNumber(data[0]);
                    console.log(partNumber);
                    setAvailableParts(data);
                }); 
        }
    }

    return (
        <div>
            <Paper elevation={3} sx={{width: "60%", margin: "auto", p: "3%", pt: "0%", mt: 2}}>
                <h3>Select Aircraft</h3>
                <br/>
                <Grid container>
                    
                    <Grid item xs={4}>
                        <FormControl sx={{mr: 4}}>
                            <TextField label="Aircraft tailnumber" onChange={(e) => setTailNumber(e.target.value)} ></TextField>
                            <br/>
                            <Button variant="contained" onClick={onAircraftSearch}>Search Aircraft</Button>
                        </FormControl>

                        <p>{aircraftStatus}</p>
                    </Grid>

                    <Grid item xs={8}>
                                            
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
                    </Grid>
                </Grid>
            </Paper>

            <Paper elevation={3} sx={{width: "35%", margin: "auto", p: "3%", pt: "0%", mt: 2}}>
                <h3>Set Aircraft Status</h3>
                <FormControl>
                    <InputLabel id="setStatusLabel">Aircraft Status</InputLabel>
                    <Select labelId="setStatusLabel" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <MenuItem value="DESIGN">Design</MenuItem>
                        <MenuItem value="PRODUCTION">Production</MenuItem>
                        <MenuItem value="OPERATION">Operational</MenuItem>
                        <MenuItem value="REPAIR">Repair</MenuItem>
                    </Select>

                    <Button variant="contained" onClick={updateStatus}>Update Status</Button>
                </FormControl>
            </Paper>

            <Paper elevation={3} sx={{width: "35%", margin: "auto", p: "3%", pt: "0%", mt: 2}}>
                <h3>Assign Part</h3>
                <Autocomplete onChange={(event, newValue) => {getAvailableParts(newValue);}} options={partCategories} renderInput={(params) => <TextField {...params} label="Part Type" />}/>
                <Autocomplete value={partNumber} options={availableParts} renderInput={(params) => <TextField {...params} label="Part Number" />}/>
            </Paper>
            



        </div>
    );
}
export default ModifyAircraft;
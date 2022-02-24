import { useState } from "react";
import {Form, FormGroup, Label, Input,Button, ButtonGroup, Col, Container} from "reactstrap";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import '../css/AddPart.css'
import { FormControl, RadioGroup, FormControlLabel, Radio, Alert, Fade, Snackbar } from "@mui/material";

const AddPart = () => {
    const [partTypeName, setPartTypeName] = useState('');
    const [partType, setPartType] = useState('1');
    const [aircraft, setAircraft] = useState('');
    const [location, setLocation] = useState('');
    const manufacture = "";
    const [partStatus, setPartStatus] = useState('OPERATIONAL');
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');

    const locations = ["Ankara", "Cardiff","Dublin","Edinburgh","London","Nevada","St Athen"];

    const partTypes = [
        {label:'Wing A', id:1},
        {label:"Wing B", id:2},
        {label:"Fuselage", id:3},
        {label:"Tail", id:4},
        {label:"Propeller", id:5},
        {label:"Motor", id:6},
        {label:"Communications Radio", id:7},
        {label:"Payload Electo Optical", id:8},
        {label:"Payload Infra-Red", id:9},
        {label:"Quad Arm", id:10},
        {label:"Gimble", id:11}];
        
    
    const handleSubmission = (e) => {
        e.preventDefault();
        setPartType(partTypeName.id);
        const part = {partType, aircraft, location, manufacture, partStatus};

            fetch('http://localhost:8080/parts/add', {
                method: 'POST',
                headers: {"Content-Type": "application/json" },
                body: JSON.stringify(part)
            }).then(response => response.json()).then(data => {
                if(data["response"] === "Success") {
                    setAlertMessage("Part added successfully!");
                    setAlertSeverity("success");
                    setAlert(true);
                    setTimeout(() => { setAlert(false) }, 3000);
                
                } else {
                    setAlertMessage(data["response"]);
                    setAlertSeverity("error");
                    setAlert(true);
                }
            }).catch(error => {
                setAlertMessage("Error communicating with server, part not saved");
                setAlertSeverity("error");
                setAlert(true);
            })
    }


    return (

        <div className="addPart">   
            <div class="alertPos">
                {alert ? <Alert severity={alertSeverity}>{alertMessage}</Alert> : <></> }
            </div> 
            

            <FormControl>
                <Autocomplete isOptionEqualToValue={(option, value) => option.id === value.id} value={partTypeName} onChange={(event, newValue) => {setPartTypeName(newValue);}} diablePortal id="partTypeSearchField" options={partTypes} renderInput={(params) => <TextField {...params} label="Part Type" />}/>
                <br/>
                <TextField label="Aircraft Tailnumber" onChange={(e) => setAircraft(e.target.value)}/>
                <br/>
                <Autocomplete value={location} onChange={(event, newValue) => {setLocation(newValue);}} disablePortal id="locationSearchField" options={locations} renderInput={(params) => <TextField {...params} label="Location" />}/> 
                <br/>
                <RadioGroup row value={partStatus} onChange={(e) => setPartStatus(e.target.value)}>
                    <FormControlLabel value="OPERATIONAL" control={<Radio color="success"/>} label="Operational"/>
                    <FormControlLabel value="AWAITING_REPAIR" control={<Radio color="success"/>} label="Awaiting Repair"/>
                    <FormControlLabel value="BEING_REPAIRED" control={<Radio color="success"/>} label="Being Repaired"/>
                    <FormControlLabel value="BEYOND_REPAIR" control={<Radio color="success"/>} label="Beyond Repair"/>
                </RadioGroup>
                <br/>
                <Button varient="contained" color="primary" size="small" onClick={handleSubmission}>Contained</Button>

            </FormControl>

        </div>

    );

}



export default AddPart
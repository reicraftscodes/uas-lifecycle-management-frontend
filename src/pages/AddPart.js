import { useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { FormControl, RadioGroup, FormControlLabel, Radio, Alert, Divider, Paper, FormLabel, Button} from "@mui/material";
import '../css/AddPart.css';
import PartsService from '../services/PartsService';

const AddPart = () => {
    //state variables using hooks which store the input field data
    const [partTypeName, setPartTypeName] = useState('');
    const [partType, setPartType] = useState('0');
    const [aircraft, setAircraft] = useState('');
    const [locationName, setLocation] = useState('');
    const [weight, setWeight] = useState("");
    const [price, setPrice] = useState("");
    const [partName, setPartName] = useState("");
    const [partStatus, setPartStatus] = useState('OPERATIONAL');

    //used for displaying errors and messages associated with them
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    let manufacture = "";

    //locations and part types used in auto complete text fields
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


    //when submit button is pressed this method is called, it adds the part to the database using a post request and displays a result alert.
    const handleSubmission = (e) => {
        //prevents reloading on form submission
        e.preventDefault();
        //sets datetime 
        var date = new Date();
        manufacture = date.toISOString().slice(0, 19).replace('T', ' ');
        //part which is turned into json for the post request
        const request = {partType, partName, locationName, manufacture, price, weight, aircraft, partStatus};
        if (partName=="") {
            setAlertMessage("Please enter a part name!");
            setAlertSeverity("error");
            setAlert(true);
            //hides the alert after displaying for 3 seconds
            setTimeout(() => { setAlert(false) }, 3000);
        } else {
            //fetch api used to send post request
            PartsService.addPart(request).then(response => response.json()).then(data => {
                if(data["response"] === "Success") {
                    //if the request is successful an alert is shown with a success message
                    setAlertMessage("Part added successfully!");
                    setAlertSeverity("success");
                    setAlert(true);
                    //hides the alert after displaying for 3 seconds
                    setTimeout(() => { setAlert(false) }, 3000);
                } else {
                    //if the request is unsuccessful it displays the response in an alert
                    setAlertMessage("Please check input fields, error adding part!");
                    setAlertSeverity("error");
                    setAlert(true);
                    setTimeout(() => { setAlert(false) }, 3000);
                }
            }).catch(error => {
                //catches error for not being able to communicate with the server and displays an alert to the user.
                setAlertMessage("Error communicating with server, part not saved");
                setAlertSeverity("error");
                setAlert(true);
                setTimeout(() => { setAlert(false) }, 3000);
            })
        }

    }

    return (
        <div className="addPart">
            {alert ? <Alert className="alertPos" severity={alertSeverity}>{alertMessage}</Alert> : <></> }
            <div className="formBody">

                {/*paper is used to contain the input form to display it*/}
                <Paper elevation={3} sx={{width: "65%", margin: "auto", p: "3%", pt: "0%", mt: "1%" }}>
                    <h1>Add Part</h1>
                    <Divider/>
                    <FormControl>
                        <br/>
                        {/*Part Type autocomplete text field */}
                        <Autocomplete isOptionEqualToValue={(option, value) => option.id === value.id}  onChange={(event, newValue) => {setPartType(newValue.id);}} id="partTypeSearchField" options={partTypes} renderInput={(params) => <TextField {...params} label="Part Type" />}/>
                        <br/>
                        <TextField label="Part Name" onChange={(e) => setPartName(e.target.value)}/>
                        <br/>
                        {/* Aircraft text field this isnt required in submission*/}
                        <TextField label="Aircraft Tailnumber (if applicable)" onChange={(e) => setAircraft(e.target.value)}/>
                        <br/>
                        <TextField type="number" label="Part Price (£)" onChange={(e) => setPrice(e.target.value)}/>
                        <br/>
                        {/*Location autocomplete text field */}
                        <Autocomplete onChange={(event, newValue) => {setLocation(newValue);}} id="locationSearchField" options={locations} renderInput={(params) => <TextField {...params} label="Location" />}/>
                        <br/>
                        <TextField type="number" label="Part Weight (g)" onChange={(e) => setWeight(e.target.value)}/>
                        <br/>
                        {/*Part status radio group */}
                        <FormLabel sx={{textAlign: "left", p: "1%"}}>Part Status</FormLabel>
                        <RadioGroup row value={partStatus} onChange={(e) => setPartStatus(e.target.value)}>
                            <FormControlLabel value="OPERATIONAL" control={<Radio color="primary"/>} label="Operational"/>
                            <FormControlLabel value="AWAITING_REPAIR" control={<Radio color="primary"/>} label="Awaiting Repair"/>
                            <FormControlLabel value="BEING_REPAIRED" control={<Radio color="primary"/>} label="Being Repaired"/>
                            <FormControlLabel value="BEYOND_REPAIR" control={<Radio color="primary"/>} label="Beyond Repair"/>
                        </RadioGroup>
                        <br/>
                        <Button style={{backgroundColor: "#004789"}} variant="contained" color="primary" size="small" onClick={handleSubmission}>Submit</Button>
                    </FormControl>
                </Paper>
            </div>
        </div>
    );
}

export default AddPart

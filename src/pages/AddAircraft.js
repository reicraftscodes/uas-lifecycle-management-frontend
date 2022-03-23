import { FormControl, RadioGroup, FormControlLabel, Radio, Alert, Divider, Paper, FormLabel, Button,TextField, Autocomplete} from "@mui/material";
import { useState } from "react";
import '../css/AddPart.css';
import AircraftService from "../services/AircraftService";

const AddAircraft = () => {
    //locations for the autocomplete field.
    const locations = ["Ankara", "Cardiff","Dublin","Edinburgh","London","Nevada","St Athen"];

    //user input state variables
    const [tailNumber, setTailNumber] = useState("");
    const [location, setLocation] = useState("");
    const [platformStatus, setPlatformStatus] = useState("Design");
    const [platformType, setPlatformType] = useState("Platform A");

    //state variables used for changing the alert colour and message aswell as displaying it.
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');

    //validation variables which stores the errors which highlight a field red if they have errors and an overall error variable to prevent
    // the fetch method being called if the input isn't valid.
    const [errorTailNumber, setErrorTailNumber] = useState(false);
    const [errorLocation, setErrorLocation] = useState(false);

    //used to validate the aircraft tailnumber and make sure location isn't blank, the other 2 fields are radio
    // buttons and have a default so validation isn't needed there.
     const validateFields = () => {
        //One or two character prefix indicating the country of registration (e.g. "N" for the United States, "VH" for Australia
        //A dash "-" is normally (not always) used between the prefix and suffix
        //One to five character suffix indicating a particular aircraft within the country
        //Created regular expression for capturing these requirements
        //Requires capital letters
        // [A-Z]{1,2}-(\d|[A-Z]){1,5}
        //Validates the tailnumber using regex and if it is not valid displays an error message.
        if (!/^([A-Z]{1,2}-(\d|[A-Z]){1,5})$/.test(tailNumber)) {
            setErrorTailNumber(true);
            setAlertMessage("Tail number must be in the form <Country identifier>-<Aircraft suffix> all uppercase.");
            setAlertSeverity("error");
            setAlert(true);
            setTimeout(() => { setAlert(false) }, 3000);
            return false;
        } else {
            setErrorTailNumber(false);
        }
        if (location=="") {
            setErrorLocation(true);
            setAlertMessage("Location must be selected.");
            setAlertSeverity("error");
            setAlert(true);
            //Removed the alert after 3 seconds.
            setTimeout(() => { setAlert(false) }, 3000);
            return false;
        } else {
            setErrorLocation(false);
        }
        return true;
    }

    //Method that is called on the submit button click which validates the input fields and if valid sends a
    // post request to the api information from the input fields.
    const handleSubmission = (e) => {
        const result = validateFields();

        const aircraft = {tailNumber, location, platformStatus, platformType};
        console.log(aircraft);
        //Checks for validation errors before sending the post request using fetch.
        if(result == true){
            AircraftService.addAircraft(aircraft)
                .then(response => response.json()).then(data => {
                if (data["response"] == "Success"){
                    //If the response returns a success json body then an alert is sent to the user saying the aircraft has been added.
                    setAlertSeverity("success");
                    setAlertMessage(data["response"]+"fully added aircraft!");
                    setAlert(true);
                    setTimeout(() => { setAlert(false) }, 3000);
                } else {
                    //If the response is unsuccessful then the response error is shown to the user in an alert.
                    setAlertSeverity("error");
                    setAlertMessage(data["response"]);
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

    return(
        <div className="main">
            {alert ? <Alert className="alertPos" severity={alertSeverity}>{alertMessage}</Alert> : <></> }
            {/* json takes tailNumber, location, platform status, platformType */}
            <Paper elevation={3} sx={{width: "65%", margin: "auto", p: "3%", pt: "0%", mt: 0 }}>

                {/*Alert to display to the user. By default it is hidden. */}

                <h1>Add Aircraft</h1>
                <Divider/>
                <br/>
                <FormControl >
                    {/*Input for the aircraft tailnumber */}
                    <TextField error={errorTailNumber} label="Aircraft tailnumber" onChange={(e) => setTailNumber(e.target.value)}></TextField>
                    <br/>
                    <Divider/>
                    <br/>
                    {/*Input for the aircraft location */}
                    <Autocomplete options={locations} onChange={(event, newValue) => {setLocation(newValue);}} renderInput={(params) => <TextField error={errorLocation} {...params} label="Location" />}/>
                    <br/>
                    <Divider/>
                    <Divider/>
                    <br/>
                    {/*Input for the aircraft status */}
                    <FormLabel sx={{textAlign: "left", p: "1%"}}>Aircraft Status</FormLabel>
                    <RadioGroup value={platformStatus} row onChange={(e) => setPlatformStatus(e.target.value)}>
                        <FormControlLabel value="Design" control={<Radio color="primary"/>} label="Design"/>
                        <FormControlLabel value="Production" control={<Radio color="primary"/>} label="Production"/>
                        <FormControlLabel value="Operation" control={<Radio color="primary"/>} label="Operation"/>
                        <FormControlLabel value="Repair" control={<Radio color="primary"/>} label="Repair"/>
                    </RadioGroup>
                    <br/>
                    <Divider/>
                    <br/>
                    {/*Input for the aircraft type */}
                    <FormLabel sx={{textAlign: "left", p: "1%", pt: "0%"}}>Aircraft Type</FormLabel>
                    <RadioGroup value={platformType} sx={{m: "auto", p: "2%"}} row onChange={(e) => setPlatformType(e.target.value)}>
                        <FormControlLabel value="Platform A" control={<Radio color="primary"/>} label="Platform A"/>
                        <FormControlLabel value="Platform B" control={<Radio color="primary"/>} label="Platform B"/>
                    </RadioGroup>

                    <Button style={{backgroundColor: "#004789"}} variant="contained" onClick={handleSubmission}>Submit</Button>
                </FormControl>
            </Paper>

        </div>
    );
}

export default AddAircraft

import { FormControl, RadioGroup, FormControlLabel, Radio, Alert, Divider, Paper, FormLabel, Button,TextField, Autocomplete} from "@mui/material";
import { useState } from "react";
import '../css/AddPart.css'

const AddAircraft = () => {
    const locations = ["Ankara", "Cardiff","Dublin","Edinburgh","London","Nevada","St Athen"];

    const [tailNumber, setTailNumber] = useState("");
    const [location, setLocation] = useState("");
    const [platformStatus, setPlatformStatus] = useState("DESIGN");
    const [platformType, setPlatformType] = useState("Platform_A");

    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');

    const [errorTailNumber, setErrorTailNumber] = useState(false);
    const [errorLocation, setErrorLocation] = useState(false);

    const validateFields = () => {


        if (location=="") {
            setErrorLocation(true);
            setAlertMessage("Location must be selected.");
            setAlertSeverity("error");
            setAlert(true);
            setTimeout(() => { setAlert(false) }, 3000);
        } else {
            setErrorLocation(false);
        }

        //One or two character prefix indicating the country of registration (e.g. "N" for the United States, "VH" for Australia
        //A dash "-" is normally (not always) used between the prefix and suffix
        //One to five character suffix indicating a particular aircraft within the country
        //Created regular expression for capturing these requirements 
        //Requires capital letters
        // [A-Z]{1,2}-(\d|[A-Z]){1,5}
        if (!/^([A-Z]{1,2}-(\d|[A-Z]){1,5})$/.test(tailNumber)) {
            setErrorTailNumber(true);
            setAlertMessage("Tail number must be in the form <Country identifier>-<Aircraft suffix> all uppercase.");
            setAlertSeverity("error");
            setAlert(true);
            setTimeout(() => { setAlert(false) }, 3000);
        } else {
            setErrorTailNumber(false);
        }

    }

    const handleSubmission = (e) => {

        const aircraft = {tailNumber, location, platformStatus, platformType};

        validateFields()





        // fetch("http://localhost:8080/aircraft/add" , {
        //     method: "POST",
        //     headers: {"Content-Type":"application/json" },
        //     body: JSON.stringify(aircraft)
        // }).then(response => response.json()).then(data => {
        //     setAlert(true);
        //     setAlertMessage(data["response"]);
        // })


        console.log(JSON.stringify(aircraft));

    }

    return(
        <div className="main">
            {/* json takes tailNumber, location, platform status, platformType */}
            <Paper elevation={3} sx={{width: "65%", margin: "auto", p: "3%", pt: "0%", mt: "1%" }}>
                <div className="alertPos">
                    {alert ? <Alert severity={alertSeverity}>{alertMessage}</Alert> : <></> }
                </div> 

                <h1>Add Aircraft</h1>
                <Divider/>
                <br/>

            
            
                <FormControl >
                    <TextField error={errorTailNumber} label="Aircraft tailnumber" onChange={(e) => setTailNumber(e.target.value)}></TextField>
                    <br/>
                    <Divider/>
                    <br/>

                    <Autocomplete options={locations} onChange={(event, newValue) => {setLocation(newValue);}} renderInput={(params) => <TextField error={errorLocation} {...params} label="Location" />}/> 

                    <br/>
                    <Divider/>
                    <br/>

                    <FormLabel sx={{textAlign: "left", p: "1%"}}>Aircraft Status</FormLabel>
                    <RadioGroup value={platformStatus} row onChange={(e) => setPlatformStatus(e.target.value)}>
                        <FormControlLabel value="DESIGN" control={<Radio color="primary"/>} label="Design"/>
                        <FormControlLabel value="PRODUCTION" control={<Radio color="primary"/>} label="Production"/>
                        <FormControlLabel value="OPERATION" control={<Radio color="primary"/>} label="Operation"/>
                        <FormControlLabel value="REPAIR" control={<Radio color="primary"/>} label="Repair"/>
                    </RadioGroup>

                    <br/>
                    <Divider/>
                    <br/>

                    <FormLabel sx={{textAlign: "left", p: "1%", pt: "0%"}}>Aircraft Type</FormLabel>
                    <RadioGroup value={platformType} sx={{m: "auto", p: "2%"}} row onChange={(e) => setPlatformType(e.target.value)}>
                        <FormControlLabel value="Platform_A" control={<Radio color="primary"/>} label="Platform A"/>
                        <FormControlLabel value="Platform_B" control={<Radio color="primary"/>} label="Platform B"/>
                    </RadioGroup>

                    <Button variant="contained" onClick={handleSubmission}>Submit</Button>
                </FormControl>


            </Paper>
    
        </div>
    );
}

export default AddAircraft
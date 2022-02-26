import { FormControl, RadioGroup, FormControlLabel, Radio, Alert, Divider, Paper, FormLabel, Button,TextField, Autocomplete} from "@mui/material";
import { useState } from "react";

const AddAircraft = () => {
    const locations = ["Ankara", "Cardiff","Dublin","Edinburgh","London","Nevada","St Athen"];

    const [tailNumber, setTailNumber] = useState("");
    const [location, setLocation] = useState("");
    const [platformStatus, setPlatformStatus] = useState("");
    const [platformType, setPlatformType] = useState("");

    const handleSubmission = (e) => {

        const aircraft = {tailNumber, location, platformStatus, platformType};

        fetch("http://localhost:8080/aircraft/add" , {
            method: "POST",
            headers: {"Content-Type":"application/json" },
            body: JSON.stringify(aircraft)
        }).then(response => response.json()).then(data => {
            console.log(data);
        })


        console.log(JSON.stringify(aircraft));

    }

    return(
        <div className="main">
            {/* json takes tailNumber, location, platform status, platformType */}
            <Paper elevation={3} sx={{width: "65%", margin: "auto", p: "3%", pt: "0%", mt: "1%" }}>
                <h1>Add Aircraft</h1>
                <Divider/>
                <br/>

            
            
                <FormControl>
                    <TextField label="Aircraft tailnumber" onChange={(e) => setTailNumber(e.target.value)}></TextField>
                    <br/>
                    <Divider/>
                    <br/>

                    <Autocomplete options={locations} onChange={(event, newValue) => {setLocation(newValue);}} renderInput={(params) => <TextField {...params} label="Location" />}/> 

                    <br/>
                    <Divider/>
                    <br/>

                    <FormLabel sx={{textAlign: "left", p: "1%"}}>Aircraft Status</FormLabel>
                    <RadioGroup row onChange={(e) => setPlatformStatus(e.target.value)}>
                        <FormControlLabel value="DESIGN" control={<Radio color="primary"/>} label="Design"/>
                        <FormControlLabel value="PRODUCTION" control={<Radio color="primary"/>} label="Production"/>
                        <FormControlLabel value="OPERATION" control={<Radio color="primary"/>} label="Operation"/>
                        <FormControlLabel value="REPAIR" control={<Radio color="primary"/>} label="Repair"/>
                    </RadioGroup>

                    <br/>
                    <Divider/>
                    <br/>

                    <FormLabel sx={{textAlign: "left", p: "1%", pt: "0%"}}>Aircraft Type</FormLabel>
                    <RadioGroup sx={{m: "auto", p: "2%"}} row onChange={(e) => setPlatformType(e.target.value)}>
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
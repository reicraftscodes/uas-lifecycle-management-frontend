import {useState} from "react";
import {
    Alert,
    Button,
    Divider,
    FormControl,
    Paper,
    TextField
} from "@mui/material";

import PartsService from "../services/PartsService";

const TransferPart = (defaultLocation) => {

    //state variables used for changing the alert colour and message as well as displaying it.
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');

    //user input state variables
    const [location, setLocation] = useState("");
    const [newLocation, setNewLocation] = useState("");
    const [partName, setPartName] = useState("");
    const [quantity, setQuantity] = useState("");


    //Method that is called on the submit button click which validates the input fields and if valid sends a
    // post request to the api information from the input fields.
    const handleSubmission = (e) => {

        const transferPart = [location, newLocation, partName, quantity]

        //Checks for validation errors before sending the post request using fetch.
        PartsService.transferPart(transferPart)
            .then(response => response.json()).then(data => {
            if (data["response"] === "Success.") {
                //If the response returns a success json body then an alert is sent to the user saying the aircraft has been added.
                setAlertSeverity("success");
                setAlertMessage(data["response"] + " transferred parts!");
                setAlert(true);
                setTimeout(() => {
                    setAlert(false)
                }, 3000);
            } else {
                //If the response is unsuccessful then the response error is shown to the user in an alert.
                setAlertSeverity("error");
                setAlertMessage(data["response"]);
                setAlert(true);
                setTimeout(() => {
                    setAlert(false)
                }, 3000);
            }
        }).catch(error => {
            //catches error for not being able to communicate with the server and displays an alert to the user.
            setAlertMessage("Error communicating with server, part not transferred");
            setAlertSeverity("error");
            setAlert(true);
            setTimeout(() => {
                setAlert(false)
            }, 3000);
        })
    }

    return (
        <div className="main">
            {alert ? <Alert className="alertPos" severity={alertSeverity}>{alertMessage}</Alert> : <></>}
            {/* json takes tailNumber, location, platform status, platformType */}
            <Paper elevation={3} sx={{width: "65%", margin: "auto", p: "3%", pt: "0%", mt: "1%"}}>
                <h1>Transfer Parts</h1>
                <Divider/>
                <br/>
                <FormControl>
                    {/*Input for the location */}
                    <TextField label="Location to transfer from" defaultValue={defaultLocation.defaultLocation} onChange={(e) => setLocation(e.target.value)}></TextField>
                    <br/>
                    <Divider/>
                    <br/>
                    {/*Input for the new location */}
                    <TextField label="New location" onChange={(e) => setNewLocation(e.target.value)}></TextField>
                    <Divider/>
                    <br/>
                    {/*Input for the part name */}
                    <TextField label="Part Name" onChange={(e) => setPartName(e.target.value)}></TextField>
                    <Divider/>
                    <br/>
                    {/*Input for the quantity */}
                    <TextField label="Quantity" onChange={(e) => setQuantity(e.target.value)}></TextField>
                    <Button variant="contained" style={{backgroundColor: "#004789"}} onClick={handleSubmission} id="submitButton">Submit</Button>
                </FormControl>
            </Paper>
        </div>
    );
}

export default TransferPart;
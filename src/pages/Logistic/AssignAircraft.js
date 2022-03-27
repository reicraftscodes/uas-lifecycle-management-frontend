import {useState} from "react";
import {
    Alert,
    Button,
    Divider,
    FormControl,
    Paper,
    TextField
} from "@mui/material";
import AircraftService from "../../services/AircraftService";

const AssignAircraft = () => {

    //state variables used for changing the alert colour and message as well as displaying it.
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');

    //user input state variables
    const [tailNumber, setTailNumber] = useState("");
    const [userID, setUserID] = useState("");


    //Method that is called on the submit button click which validates the input fields and if valid sends a
    // post request to the api information from the input fields.
    const handleSubmission = (e) => {

        const aircraft = {userID, tailNumber};
        console.log(aircraft);
        //Checks for validation errors before sending the post request using fetch.
        AircraftService.assignAircraft(aircraft).then(response => response.json()).then(data => {
            if (data["response"] === "Success") {
                //If the response returns a success json body then an alert is sent to the user saying the aircraft has been added.
                setAlertSeverity("success");
                setAlertMessage(data["response"] + " assigned aircraft!");
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
            setAlertMessage("Error communicating with server, part not saved");
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
                <h1>Assign Aircraft</h1>
                <Divider/>
                <br/>
                <FormControl>
                    {/*Input for the aircraft tailnumber */}
                    <TextField label="Aircraft tailnumber" onChange={(e) => setTailNumber(e.target.value)}></TextField>
                    <br/>
                    <Divider/>
                    <br/>
                    {/*Input for the user id */}
                    <TextField label="User ID" onChange={(e) => setUserID(e.target.value)}></TextField>
                    <Button variant="contained" style={{backgroundColor: "#004789"}} onClick={handleSubmission} id="submitButton">Submit</Button>
                </FormControl>
            </Paper>

        </div>
    );
}

export default AssignAircraft;
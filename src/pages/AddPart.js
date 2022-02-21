import { useState } from "react";
import {Form, FormGroup, Label, Input,Button} from "reactstrap";

const AddPart = () => {
    const [partType, setPartType] = useState('');
    const [aircraft, setAircraft] = useState('');
    const [location, setLocation] = useState('');
    const [partStatus, setPartStatus] = useState('');

    const handleSubmission = () => {
        console.log("test" + partType);
    }

    return (
        <div className="addPart">
            <h1>Add Part</h1>

            <Form>
                <FormGroup>
                    <Label for="partTypeForm">Part Type</Label>
                    <Input id="partTypeForm" name="Part Type" type="text" value={partType} onChange={(e) => setPartType(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label for="aircraftForm">Aircraft</Label>
                    <Input id="aircraftForm" name="Aircraft" type="text" value={aircraft} onChange={(e) => setAircraft(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label for="locationForm">Location</Label>
                    <Input id="locationForm" name="Location" type="text" value={location} onChange={(e) => setLocation(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label for="partStatusForm">Part Status</Label>
                    <Input id="partStatusForm" name="Part Status" type="text" value={partStatus} onChange={(e) => setPartStatus(e.target.value)}/>
                </FormGroup>

                <Button onClick={handleSubmission}>Submit</Button>
            </Form>


        </div>  
    );
}

    

export default AddPart
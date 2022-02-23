import { faBold } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ReactDOM from "react-dom";
import {Form, FormGroup, Label, Input,Button, ButtonGroup} from "reactstrap";
import '../css/AddPart.css'

const AddPart = () => {
    const [partType, setPartType] = useState('');
    const [aircraft, setAircraft] = useState('');
    const [location, setLocation] = useState('');
    const manufacture = "";
    const [partStatus, setPartStatus] = useState('');
    

    const handleSubmission = (e) => {
        e.preventDefault();
        const part = {partType, aircraft, location, manufacture, partStatus};

        fetch('http://localhost:8080/parts/add', {
            method: 'POST',
            headers: {"Content-Type": "application/json" },
            body: JSON.stringify(part)
        }).then(response => response.json()).then(data => console.log(data))

        
    }


    return (

        

        <div className="addPart">
            <h1>Add Part</h1>

            <Form>
                <FormGroup>
                    <Label for="partTypeForm">Part Type</Label>
                    <Input id="partTypeForm" name="Part Type" type="select" value={partType} onChange={(e) => setPartType(e.target.value)}>
                        <option value="1">Wing A</option>
                        <option value="2">Wing B</option>
                        <option value="3">Fuselage</option>
                        <option value="4">Tail</option>
                        <option value="5">Propeller</option>
                        <option value="6">Motor</option>
                        <option value="7">Communications Radio</option>
                        <option value="8">Payload Electo Optical</option>
                        <option value="9">Payload Infra-Red</option>
                        <option value="10">Quad Arm</option>
                        <option value="11">Gimble</option>
                        
                    </Input>
                </FormGroup>

                <FormGroup>
                    <Label for="aircraftForm">Aircraft</Label>
                    <Input id="aircraftForm" name="Aircraft" type="text" value={aircraft} onChange={(e) => setAircraft(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label for="locationForm">Location</Label>
                    <Input id="locationForm" name="Location" type="text" value={location} onChange={(e) => setLocation(e.target.value)}/>
                </FormGroup>

                <FormGroup class="radioButton" tag="fieldset" value={partStatus} checked={partStatus}>
                    <Input value="OPERATIONAL" name="partStatusForm" type="radio" onChange={(e) => setPartStatus(e.target.value)}/>
                    <Label check>Operational</Label>

                    <Input value="AWAITING_REPAIR" name="partStatusForm" type="radio" onChange={(e) => setPartStatus(e.target.value)}/>
                    <Label check>Awaiting Repair</Label>

                    <Input value="BEING_REPAIRED" name="partStatusForm" type="radio" onChange={(e) => setPartStatus(e.target.value)}/>
                    <Label check>Being Repaired</Label>
                    
                    <Input value="BEYOND_REPAIR" name="partStatusForm" type="radio" onChange={(e) => setPartStatus(e.target.value)}/>
                    <Label check>Beyond Repair</Label>
                    
                </FormGroup>
            </Form>
        </div>


    );
}


export default AddPart
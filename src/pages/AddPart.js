import { faBold } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ReactDOM from "react-dom";
import {Form, FormGroup, Label, Input,Button, ButtonGroup, Col, Container,Alert} from "reactstrap";
import '../css/AddPart.css'

const AddPart = () => {
    const [partType, setPartType] = useState('1');
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

            <div class="heading">
               <h1>Add Part</h1> 
            </div>

            <div class="form">
            <Form>
                <FormGroup row>
                    <Label for="partTypeForm" sm={2}>Part Type</Label>

                    <Col sm={10}>
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
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label for="aircraftForm" sm={2}>Aircraft</Label>

                    <Col sm={10}>
                        <Input w-25 id="aircraftForm" name="Aircraft" type="text" value={aircraft} onChange={(e) => setAircraft(e.target.value)}/>
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label for="locationForm" sm={2}>Location</Label>

                    <Col sm={10}>
                        <Input id="locationForm" name="Location" type="text" value={location} onChange={(e) => setLocation(e.target.value)}/>
                    </Col>
                </FormGroup>

                <FormGroup row class="radioButton" tag="fieldset" value={partStatus} checked={partStatus}>
                    <Label sm={2}>Part status</Label>

                    <Col sm={10}>
                        <Input value="OPERATIONAL" name="partStatusForm" type="radio" onChange={(e) => setPartStatus(e.target.value)}/>
                        <div class="radioLabel">
                            <Label check>Operational</Label>
                        </div>

                        <Input value="AWAITING_REPAIR" name="partStatusForm" type="radio" onChange={(e) => setPartStatus(e.target.value)}/>
                        <div class="radioLabel">
                            <Label check class="radioLabel" >Awaiting Repair</Label>
                        </div>
                        
                        <Input value="BEING_REPAIRED" name="partStatusForm" type="radio" onChange={(e) => setPartStatus(e.target.value)}/>
                        <div class="radioLabel">
                            <Label check class="radioLabel" >Being Repaired</Label>
                        </div>
                        
                        <Input value="BEYOND_REPAIR" name="partStatusForm" type="radio" onChange={(e) => setPartStatus(e.target.value)}/>
                        <div class="radioLabel">
                            <Label check class="radioLabel" >Beyond Repair</Label>
                        </div>
                    </Col>
                </FormGroup>

                <Col sm={{offset: 2, size: 10}}>
                    <Button onClick={handleSubmission}>Submit</Button>
                </Col>
            </Form>
            </div>

        </div>

        


    );

}



export default AddPart
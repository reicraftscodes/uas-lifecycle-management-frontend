import { useState } from "react";
import {Form, FormGroup, Label, Input,Button, ButtonGroup, Col, Container,Alert} from "reactstrap";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import '../css/AddPart.css'
import { FormControl, RadioGroup, FormControlLabel, Radio } from "@mui/material";

const AddPart = () => {
    const [partTypeName, setPartTypeName] = useState('Wing A');
    const [partType, setPartType] = useState('1');
    const [aircraft, setAircraft] = useState('');
    const [location, setLocation] = useState('');
    const manufacture = "";
    const [partStatus, setPartStatus] = useState('');

    const locations = ["Ankara", "Cardiff","Dublin","Edinburgh","London","Nevada","St Athen"];

    const partTypes = [
        {label:"Wing A", id:1},
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
            }).then(response => response.json()).then(data => console.log(data))

        

    }



    return (

        <div className="addPart">

            <br/>
            <FormControl>
                <Autocomplete value={partTypeName} onChange={(event, newValue) => {setPartTypeName(newValue);}} diablePortal id="partTypeSearchField" options={partTypes} renderInput={(params) => <TextField {...params} label="Part Type" />}/>
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

                


            {/* <div class="heading">
               <h1>Add Part</h1> 
            </div>

            <Autocomplete disablePortal id="locationSearchField" options={locations} renderInput={(params) => <TextField {...params} label="Location" />}/>

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

                <hr class="solid"></hr>

                <FormGroup row>
                    <Label for="aircraftForm" sm={2}>Aircraft</Label>

                    <Col sm={10}>
                        <Input id="aircraftForm" name="Aircraft" type="text" value={aircraft} onChange={(e) => setAircraft(e.target.value)}/>
                        
                    </Col>
                </FormGroup>

                <hr class="solid"></hr>

                <FormGroup row>
                    <Label for="locationForm" sm={2}>Location</Label>

                    <Col sm={10}>
                        <Input id="locationForm" name="Location" type="text" value={location} onChange={(e) => setLocation(e.target.value)}/>
                    </Col>
                </FormGroup>

                <hr class="solid"></hr>

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

                <hr class="solid"></hr>

                <Col sm={{offset: 2, size: 10}}>
                    <Button onClick={handleSubmission}>Submit</Button>
                </Col>
            </Form>
            </div> */}

        </div>

        


    );

}



export default AddPart
import React from 'react';
import {Button, Card, CardImg, CardText, CardTitle} from 'reactstrap';
import HandymanIcon from '@mui/icons-material/Handyman';

export default class Repairs extends React.Component {


    constructor(props) {
        super(props);
        this.state = {needingRepair: []};
    }

    componentDidMount() {

        //fetch api used to send get request
        fetch('http://localhost:8080/aircraft/needing-repair')
            .then(response => response.json()).then(data => {
            this.setState({needingRepair: data})
        }).catch(error => {
            //catches error for not being able to communicate with the server and displays an alert to the user.
            alert("Server request for low stock parts failed." + error)
        })
    }

    render() {

        const repairMessage = this.state.needingRepair;
        const objectValue = Object.values(repairMessage);

        return (

            <Card>
                <CardTitle id="repairTitle">Repair</CardTitle>
                <CardText>There are {objectValue} aircraft with parts that are in need of repair</CardText>
                <Button id="view-aircraft">View Aircraft</Button>
                <HandymanIcon id="handymanIcon"></HandymanIcon>
            </Card>

        );
    }
}
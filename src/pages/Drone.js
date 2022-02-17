import React from 'react'
import '../Location.css'
import '../Drone.css'
import PageTitle from '../components/Typography/PageTitle'
import {Card, CardText, CardTitle} from "reactstrap";
import {Link} from "react-router-dom";


function Drone() {

    const dronePart = {name: 'Propeller', partId: 1, units: 80, cost: 0, status: 'Awaiting repair'}
    const dronePart2 = {name: 'Gimbal', partId: 2, units: 52, cost: 0, status: 'Being repaired'}
    const dronePart3 = {name: 'Tail', partId: 3, units: 40, cost: 0, status: 'Operational'}
    const dronePart4 = {name: 'Payload Electro Optical', partId: 4, units: 24, cost: 0, status: 'Awaiting repair'}
    const dronePart5 = {name: 'Motor', partId: 5, units: 21, cost: 0, status: 'Awaiting repair'}
    const dronePart6 = {name: 'Fuselage', partId: 6, units: 30, cost: 0, status: 'Beyond repair'}

    const parts = [dronePart, dronePart2, dronePart3, dronePart4, dronePart5, dronePart6]

    const drone = {droneId: 1, dronePlatform: 1, parts}

    const droneList = parts.map(part => {
        return <Link to={`/app/parts/${part.partId}`}><div className="part-container">
            <Card className="part-card">
                <CardTitle id="title">{part.name}</CardTitle>
                <CardText>ID: {part.partId}</CardText>
                <CardText>Units: {part.units}</CardText>
                <CardText>Cost: £{part.cost}</CardText>
                <CardText>Status: {part.status}</CardText>
            </Card>
        </div>
        </Link>
    })


    return (
        <>
            <PageTitle>Inventory</PageTitle>
            <h2>Drone #{drone.droneId}</h2>
            <br />
            <h3>Drone Inventory</h3>
            <br />
            {droneList}
        </>
    )
}

export default Drone
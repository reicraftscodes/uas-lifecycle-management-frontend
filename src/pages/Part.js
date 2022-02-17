import {Card, CardText, CardTitle} from "reactstrap";
import React from "react";
import {useParams} from "react-router-dom";

function Part() {

    const { partId } = useParams()
    const dronePart = {failurePeriodTime: 100, failureTime: 100, weight: 2, location: 'Cardiff', name: 'Propeller', partId: 1, units: 80, cost: 0, status: 'Awaiting repair'}
    const dronePart2 = {failurePeriodTime: 100, failureTime: 100, weight: 2, location: 'Cardiff', name: 'Gimbal', partId: 2, units: 52, cost: 0, status: 'Being repaired'}
    const dronePart3 = {failurePeriodTime: 100, failureTime: 100, weight: 2, location: 'Cardiff', name: 'Tail', partId: 3, units: 40, cost: 0, status: 'Operational'}
    const dronePart4 = {failurePeriodTime: 100, failureTime: 100, weight: 2, location: 'Cardiff', name: 'Payload Electro Optical', partId: 4, units: 24, cost: 0, status: 'Awaiting repair'}
    const dronePart5 = {failurePeriodTime: 100, failureTime: 100, weight: 2, location: 'Cardiff', name: 'Motor', partId: 5, units: 21, cost: 0, status: 'Awaiting repair'}
    const dronePart6 = {failurePeriodTime: 100, failureTime: 100, weight: 2, location: 'Cardiff', name: 'Fuselage', partId: 6, units: 30, cost: 0, status: 'Beyond repair'}

    const parts = [dronePart, dronePart2, dronePart3, dronePart4, dronePart5, dronePart6]

    let currentPart = ''

    for (var i = 0; i < parts.length; i++) {
        if (parts[i].partId == partId){
        currentPart = parts[i];
        break;
    }
    }

    const part = () => {
        return <div className="part-container">
            <Card className="part-card">
                <CardTitle id="title">{currentPart.name}</CardTitle>
                <CardText>Part No.: {currentPart.partId}</CardText>
                <CardText>Status: {currentPart.status}</CardText>
                <CardText>Location: {currentPart.location}</CardText>
                <CardText>Weight per Unit: {currentPart.weight}</CardText>
                <CardText>Total Weight: {currentPart.weight * currentPart.units}</CardText>
                <CardText>Quantity: {currentPart.units}</CardText>
                <CardText>Price per Unit: {currentPart.cost}</CardText>
                <CardText>Total Value Price: {currentPart.cost * currentPart.units}</CardText>
                <CardText>Failure Time: {currentPart.failureTime}</CardText>
                <CardText>Typical Failure Period Time: {currentPart.failurePeriodTime}</CardText>
            </Card>
        </div>
    }

    return (
        <>
            <h1>Part</h1>

            {part()}


        </>
    )
}

export default Part

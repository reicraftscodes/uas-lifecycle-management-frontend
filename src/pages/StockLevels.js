import {Card, CardText, CardTitle} from "reactstrap";
import {Link} from "react-router-dom";
import React from "react";

function StockLevels() {

    const dronePart = {failurePeriodTime: 100, failureTime: 100, weight: 2, location: 'Cardiff', name: 'Payload Electro Optical', partId: 4, units: 24, cost: 0, status: 'Awaiting repair'}
    const dronePart2 = {failurePeriodTime: 100, failureTime: 100, weight: 2, location: 'Cardiff', name: 'Motor', partId: 5, units: 21, cost: 0, status: 'Awaiting repair'}
    const dronePart3 = {failurePeriodTime: 100, failureTime: 100, weight: 2, location: 'Cardiff', name: 'Fuselage', partId: 6, units: 30, cost: 0, status: 'Beyond repair'}
    const dronePart4 = {failurePeriodTime: 100, failureTime: 100, weight: 2, location: 'Cardiff', name: 'FictionalPart', partId: 6, units: 8, cost: 0, status: 'Beyond repair'}

    const parts = [dronePart, dronePart2, dronePart3, dronePart4]

    const partList = parts.map(part => {
        return <Link to={`/app/parts/${part.partId}`} id="stockLink">
            <Card id="partCard">
                <CardTitle id="cardTitle">{part.name}</CardTitle>
                <CardText id="cardText">Stock Percentage</CardText>
                <CardText id="stockPercentage">{part.units}%</CardText>
            </Card>
        </Link>
    })

    return (
        <>
            <h1>Low Stock Parts</h1>
            <div id="flex-container">
            {partList}
            </div>
        </>
    )
}

export default StockLevels

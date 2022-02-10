import {Card, CardText, CardTitle} from "reactstrap";
import {Link} from "react-router-dom";
import PageTitle from "../components/Typography/PageTitle";
import React from "react";

function StockLevels() {

    const dronePart = {failurePeriodTime: 100, failureTime: 100, weight: 2, location: 'Cardiff', name: 'Payload Electro Optical', partId: 4, units: 24, cost: 0, status: 'Awaiting repair'}
    const dronePart2 = {failurePeriodTime: 100, failureTime: 100, weight: 2, location: 'Cardiff', name: 'Motor', partId: 5, units: 21, cost: 0, status: 'Awaiting repair'}
    const dronePart3 = {failurePeriodTime: 100, failureTime: 100, weight: 2, location: 'Cardiff', name: 'Fuselage', partId: 6, units: 30, cost: 0, status: 'Beyond repair'}

    const parts = [dronePart, dronePart2, dronePart3]

    const partList = parts.map(part => {
        return <Link to={`/app/parts/${part.partId}`}><div className="part-container">
            <Card className="part-card">
                <CardTitle>{part.name}</CardTitle>
                <CardText>Stock Percentage: {part.units}%</CardText>
            </Card>
        </div>
        </Link>
    })

    return (
        <>
            <PageTitle>Low Stock Parts</PageTitle>

            {partList}

        </>
    )
}

export default StockLevels

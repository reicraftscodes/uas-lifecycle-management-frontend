import React from 'react'
import '../Location.css'

import PageTitle from '../components/Typography/PageTitle'
import {Card, CardText, CardTitle} from "reactstrap";
import {Link} from "react-router-dom";


function Location(props) {

    //Make location equal to the location passed via route
    const location = props.match.params.location

    const drone1 = {droneId: 1, dronePlatform: 1}
    const drone2 = {droneId: 2, dronePlatform: 2}
    const drones = [drone1, drone2]

    const droneList = drones.map(drone => {
        return <Link to={`/app/drones/${drone.droneId}`}><div className="drone-container">
            <Card className="drone-card">
                <CardTitle id="title">Drone</CardTitle>
                <CardText id="id">Drone Id   {drone.droneId}</CardText>
                <CardText id="platform">Platform {drone.dronePlatform}</CardText>
            </Card>
        </div>
        </Link>
    })


    return (
        <>
            <PageTitle>Location</PageTitle>
            <h2>{location}</h2>
            {droneList}
        </>
    )
}

export default Location
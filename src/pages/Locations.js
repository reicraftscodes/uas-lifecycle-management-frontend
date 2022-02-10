import React from 'react'


import PageTitle from '../components/Typography/PageTitle'
import {Card, CardTitle} from "reactstrap";
import {Link} from "react-router-dom";


function Locations() {

    const locations = ["St. Athan, Cardiff", "location2", "location3", "location4", "location5", "location6", "location7", "location8"]

    const locationList = locations.map(location => {
        return <div className="location-container">
            <Card className="location-card">

                <CardTitle><Link to={`/app/locations/${location}`}>{location}</Link></CardTitle>
            </Card>
        </div>
    })

    return (
        <>
          <PageTitle>Locations</PageTitle>

            {locationList}


        </>
    )
}

export default Locations

import React from 'react'


import {Card, CardTitle} from "reactstrap";
import {Link} from "react-router-dom";


function Locations() {

    const locations = ["St. Athan, Cardiff", "location2", "location3", "location4", "location5", "location6", "location7", "location8"]

    const locationList = locations.map(location => {
        return <div className="location-container">
            <Card className="location-card">

                <CardTitle><Link to={`/locations/${location}`}>{location}</Link></CardTitle>
            </Card>
        </div>
    })

    return (
        <>
          <h1>Locations</h1>

            {locationList}

        </>
    )
}

export default Locations

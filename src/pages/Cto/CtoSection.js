import React, {useEffect, useState} from "react";
import {Container} from "reactstrap";
import {Card, Typography} from "@mui/material";
import PartsService from "../../services/PartsService";
import AvgFailureTimesBarChart from "./AvgFailureTimesBarChart";

function CtoSection() {

    const [failingTimeData, setFailingTimeData] = useState([]);

    useEffect(() => {
        PartsService.getFailingTime()
            .then(response => response.json())
            .then(data => {
                setFailingTimeData(data)
            });

    }, []);

    return (
        <Container>
            <br/>
            <Typography variant="h5" align="left">Dashboard</Typography>
            <br/>
            <Card elevation={6}>
                <AvgFailureTimesBarChart data={failingTimeData}/>
            </Card>
            <br/>
            <br/>
            <Card elavation={6}>
                <Typography m={2} id="platform-stats">Platform status</Typography>
                <p> display table here...</p>
            </Card>
        </Container>
    )
}

export default CtoSection
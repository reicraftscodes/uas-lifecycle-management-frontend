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

        </Container>
    )
}

export default CtoSection
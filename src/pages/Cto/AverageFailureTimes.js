import React, {useEffect, useState} from "react";
import {Container} from "reactstrap";
import {Card, Typography} from "@mui/material";
import PartsService from "../../services/PartsService";
import AvgFailureTimesBarChart from "./AvgFailureTimesBarChart";

function AverageFailureTimes() {

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
            <Typography p={5} variant="h5" align="center">Average Failing Times Chart</Typography>
            <Card elevation={6} sx={{m: 1, p: "1%"}}>
                <AvgFailureTimesBarChart data={failingTimeData}/>
            </Card>
        </Container>
    )
}

export default AverageFailureTimes
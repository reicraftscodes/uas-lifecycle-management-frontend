import React, {useEffect, useState} from "react";
import {Container} from "reactstrap";
import {Card} from "@mui/material";
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
            <Card elevation={6}>
                <AvgFailureTimesBarChart data={failingTimeData}/>
            </Card>
        </Container>
    )
}

export default AverageFailureTimes
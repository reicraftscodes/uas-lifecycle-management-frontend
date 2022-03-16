import React, {useEffect, useState} from "react";
import {Container} from "reactstrap";
import AvgFailureTimesBarChart from "./AvgFailureTimesBarChart";
import {Card, Typography} from "@mui/material";
import PartsService from "../../services/PartsService";

function CtoSection() {

    const [barChartData, setBarChartData] = useState({});
    const [isBarChartLoading, setIsBarChartLoading] = useState(true);

    useEffect(() => {
        PartsService.getFailingTime()
            .then(response => response.json())
            .then(data => {
                setBarChartData(data)
                setIsBarChartLoading(false);
            });
    }, []);

    return (
        <Container>
            <br/>
            <Typography variant="h5" align="left">Dashboard</Typography>
            <br/>
            <Card elevation={6}>
                <Typography m={2} id="partsfailuretime">Average Time </Typography>
                {!isBarChartLoading &&
                <AvgFailureTimesBarChart categories={barChartData.categories} data={barChartData.data} seriesName="failureTime"
                                         chartId="apex-pie-chart"/>}
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
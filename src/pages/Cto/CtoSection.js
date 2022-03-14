import React, {useEffect, useState} from "react";
import {Container} from "reactstrap";
import AvgBar from "./AvgBar";
import {Card, Typography} from "@mui/material";

function CtoSection() {

    const [barChartData, setBarChartData] = useState({});
    const [isBarChartLoading, setIsBarChartLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:8080/parts/failuretime`)
            .then(response => response.json())
            .then(data => {
                setBarChartData(data)
                setIsBarChartLoading(false);
            });
    });

    return (
        <Container maxWidth="lg">
            <br/>
            <Typography variant="h5" align="left">Dashboard</Typography>
            <br/>
            <Card elevation={6}>
                <Typography m={2} id="partsfailure">Average Time </Typography>
                {!isBarChartLoading &&
                <AvgBar categories={barChartData.categories} data={barChartData.data} seriesName="failureTime"
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
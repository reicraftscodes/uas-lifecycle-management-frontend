import React, {useEffect, useState} from "react";
import {Container} from "reactstrap";
import AvgBar from "./AvgBar";
import {Card, Paper} from "@mui/material";

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
            <Card>
                <h1>Average Time </h1>
                {!isBarChartLoading &&
                <AvgBar categories={barChartData.categories} data={barChartData.data} seriesName="failureTime"
                        chartId="apex-pie-chart"/>}
            </Card>
        </Container>
    )
}

export default CtoSection
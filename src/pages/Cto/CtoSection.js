import React, {useEffect, useState} from "react";
import {Container} from "reactstrap";
import AvgBar from "./AvgBar";

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
        <Container>
            <div className="">
                <h1>Average Time </h1>
                {!isBarChartLoading &&
                <AvgBar categories={barChartData.categories} data={barChartData.data} seriesName="failureTime"
                        chartId="apex-pie-chart"/>}
            </div>
        </Container>
    )
}
export default CtoSection
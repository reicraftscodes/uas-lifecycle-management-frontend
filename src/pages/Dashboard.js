import React, {useEffect, useState} from "react";
import {Container} from "reactstrap";
import DetailsCard from "../components/DetailsCard";
import StockPopup from "../components/StockPopup";
import {faHammer, faArrowTrendDown} from "@fortawesome/free-solid-svg-icons";
import ChartCard from "../components/ChartCard";
import ChartLegend from "../components/ChartLegend";
import {Bar} from 'react-chartjs-2'
import {
    barOptions,
    barLegends,
} from '../components/chartsData'
import AvgBar from "./dashboard/AvgBar";

function Dashboard() {

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
            <StockPopup />
                <div id="details-container">
                    <DetailsCard className="iconCard" id="lowStocks" name="Low Stocks" value="6" icon={faArrowTrendDown}/>
                    <DetailsCard className="iconCard" id="repairsNeeded" name="Repairs Needed" value="12" icon={faHammer}/></div>
                <div>
                    <h1>Stock Level Charts</h1>
                    <div className="chartsContainer">
                        <ChartCard title="Platform 1">
                            <Bar {...barOptions} />
                            <ChartLegend legends={barLegends} />
                        </ChartCard>
                        <ChartCard title="Platform 2">
                            <Bar {...barOptions} />
                            <ChartLegend legends={barLegends} />
                        </ChartCard>
                    </div>
                </div>
                <div className="">
                    <h1>Average Time </h1>
                    {!isBarChartLoading &&
                    <AvgBar categories={barChartData.categories} data={barChartData.data} seriesName="failureTime"
                         chartId="apex-pie-chart"/>}
            </div>
            </Container>
    )

}
export default Dashboard
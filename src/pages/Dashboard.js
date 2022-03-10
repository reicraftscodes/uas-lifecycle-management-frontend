import React from "react";
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
export default class Dashboard extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Container>
                <StockPopup />
                <div id="details-container">
                    <DetailsCard className="iconCard" id="lowStocks" name="Low Stocks" value="6" icon={faArrowTrendDown}/>
                    <DetailsCard className="iconCard" id="repairsNeeded" name="Repairs Needed" value="12" icon={faHammer}/>
                </div>
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
            </Container>
        )
    }
}
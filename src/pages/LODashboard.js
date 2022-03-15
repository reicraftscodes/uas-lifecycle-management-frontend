import React from "react";
import {Container} from "reactstrap";
import StockPopup from "../components/StockAlert";
import Repairs from "../components/Repairs";
import StockAlert from "../components/StockAlert";

export default class LODashboard extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Container>
                <div id="loDashboardFlexContainer">
                    <div id="repairs">
                        <Repairs />
                    </div>
                    <div id="alert">
                        <StockAlert />
                    </div>
                </div>
            </Container>
        )
    }
}
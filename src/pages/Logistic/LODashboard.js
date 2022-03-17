import React from "react";
import {Container} from "reactstrap";
import StockPopup from "../../components/StockPopup";
import Repairs from "../../components/Repairs";

export default class npLODashboard extends React.Component {

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
                </div>
            </Container>
        )
    }
}
import React from "react";
import {Container} from "reactstrap";
import DetailsCard from "../components/DetailsCard";

export default class Dashboard extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Container>
                <div id="details-container">
                    <DetailsCard name="Low Stocks" value="3" />
                    <DetailsCard name="Repairs Needed" value="3" />
                </div>
                <div>
                </div>
            </Container>
        )
    }
}
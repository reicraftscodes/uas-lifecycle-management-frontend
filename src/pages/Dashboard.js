import React from "react";
import AppNavbar from "../components/AppNavbar";
import {Container} from "reactstrap";
import DetailsCard from "../components/DetailsCard";

export default class Dashboard extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        return (
            <Container>
                <AppNavbar />
                <div>
                    <DetailsCard name="Low Stocks" value="3">
                    </DetailsCard>
                    <DetailsCard name="Repairs Needed" value="3"></DetailsCard>
                </div>
                <div>

                </div>
            </Container>
        )
    }
}
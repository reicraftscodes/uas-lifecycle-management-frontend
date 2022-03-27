import React from "react";
import Repairs from "../../components/Repairs";
import StockAlert from "../../components/StockAlert";
import {Box, Grid} from "@mui/material";

export default class npLODashboard extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Grid container>
                <Repairs/>
                <StockAlert/>
            </Grid>
        )
    }
}

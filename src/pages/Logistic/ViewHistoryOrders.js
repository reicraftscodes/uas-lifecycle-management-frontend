import React, {useEffect, useState} from 'react';
import {Box, Grid, Paper, styled} from "@mui/material";
import PartsService from "../../services/PartsService";
import OrderHistoryTable from "./OrderHistoryTable";
import Typography from "@mui/material/Typography";


function ViewHistoryOrders() {
    const [historyOrders, setHistoryOrders] = useState([]);


    useEffect(() => {
        getOrderHistory();
    }, []);

    const getOrderHistory = () => {
        PartsService.getOrderHistory()
            .then(response => response.json())
            .then(data => {
                console.log("Successfully retrieved stock history", data);
                setHistoryOrders(data);
                console.log(data);
            })
            .catch(error => {
                console.log("Error retrieving stock history", error);
            })
    }

    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));


    return (
        <div>
            <Box sx={1} margin="10px">
                <Typography variant="h4" style={{ fontWeight: 600 }}>Order History</Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Item>
                            <OrderHistoryTable data={historyOrders}/>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default ViewHistoryOrders;
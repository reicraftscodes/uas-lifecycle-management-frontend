import React, {useEffect, useState} from 'react';
import {Box, Grid} from "@mui/material";
import RepairCostCard from "./RepairCostCard";
import HandymanIcon from '@mui/icons-material/Handyman';
import SettingsIcon from '@mui/icons-material/Settings';
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';

function RepairCostStats({data}) {

    const [totalRepair, setTotalRepair] = useState(0);
    const [totalParts, setTotalParts] = useState(0);
    const [totalSpent, setTotalSpent] = useState(0);

    const calculateTotalRepairSpent = () => {
        return data.map(row => row.repairCost)
            .reduce((previousValue, currentValue) => previousValue + currentValue, 0)
    }

    const calculateTotalPartsSpent = () => {
        return data.map(row => row.partCost)
            .reduce((previousValue, currentValue) => previousValue + currentValue, 0)
    }


    const calculateTotalSpent = () => {
        return data.map(row => row.totalCost)
            .reduce((previousValue, currentValue) => previousValue + currentValue, 0)
    }

    const formatMoney = (value, currency) => {
        return value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'GBP',
        });
    }
    useEffect(() => {
        setTotalRepair(calculateTotalRepairSpent())
        setTotalParts(calculateTotalPartsSpent())
        setTotalSpent(calculateTotalSpent())
    }, [data])

    const iconStyle = { color: 'red', width: '40px', height: '40px'}

    return (
        <Box sx={1} margin="10px">
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <RepairCostCard icon={<HandymanIcon sx={iconStyle}/>} value={formatMoney(totalRepair)} footer="Total Spent On Repairs"/>
                </Grid>
                <Grid item xs={4}>
                    <RepairCostCard icon={<SettingsIcon sx={iconStyle}/>} value={formatMoney(totalParts)} footer="Total Spent On Parts"/>
                </Grid>
                <Grid item xs={4}>
                    <RepairCostCard icon={<CurrencyPoundIcon sx={iconStyle}/>} value={formatMoney(totalSpent)} footer="Total Spent"/>
                </Grid>
            </Grid>
        </Box>
    );
}

export default RepairCostStats;
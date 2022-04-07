import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import PartsService from "../../services/PartsService";
import StockPartsLocation from "../../components/StockPartsLocation";
import {Paper} from "@mui/material";
import TransferPart from "../../components/TransferPart";

function ViewPartsStockLocations() {

    const {partNumber} = useParams();


    const [stockLocation, setStockLocation] = useState([]);

    useEffect(() => {
        getViewListParts();
    }, [partNumber]);

    const getViewListParts = () => {
        PartsService.getViewListParts()
            .then(response => response.json())
            .then(data => {
                console.log("Successfully retrieved view parts list", data);
                const part = data.find(partList => partList.partNumber === parseInt(partNumber));
                setStockLocation(part.stockLocations ?? [])
            })
            .catch(error => {
                console.log("Error retrieving view parts list ", error);
            })
    }

    return (
        <div>
            <Paper elevation={3} sx={{width: "65%", margin: "auto", p: "3%", pt: "0%", mt: "1%"}}>
                <StockPartsLocation stockPartsLocations={stockLocation}/>
            </Paper>
            <TransferPart />
        </div>

    );
}

export default ViewPartsStockLocations;
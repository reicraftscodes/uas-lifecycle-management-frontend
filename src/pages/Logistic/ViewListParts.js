import React, {useEffect, useState} from "react";
import {Box, Button, Grid, Paper, styled} from "@mui/material";
import ViewListPartsTable from "./ViewListPartsTable";
import PartsService from "../../services/PartsService";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";

function VieListParts() {

    const [listOfParts, setlistOfParts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getViewListParts();
    }, []);

    const getViewListParts = () => {
        PartsService.getViewListParts()
            .then(response => response.json())
            .then(data => {
                console.log("Successfully retrieved view parts list", data);
                setlistOfParts(data);
            })
            .catch(error => {
                console.log("Error retrieving view parts list ", error);
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
                <Typography variant="h4" style={{ fontWeight: 600 , marginTop: "20px"}}>View Parts</Typography>
                <div style={{display: "flex", justifyContent: "flex-end"}}>
                    <Button style={{margin: "20px", backgroundColor: "#004789"}} variant="contained"
                            onClick={() => navigate(`/add-part/`)}>Add Part</Button>
                </div>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Item>
                            <ViewListPartsTable data={listOfParts}/>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default VieListParts;

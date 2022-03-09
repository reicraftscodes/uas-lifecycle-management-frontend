import React, {useEffect} from 'react';
import {
    Box,
    Grid,
    styled,
    Paper, Typography
} from '@mui/material';
import PartsFailureTable from "../components/PartsFailureTable";
import PartsFailureChart from "../components/PartsFailureChart";
import PartsService from "../services/PartsService";

const PartsFailure = () => {

    const [partsFailureList, setPartsFailureList] = React.useState([]);

    useEffect(() => {
        getPartsFailure();
        console.log("use effect");
    }, []);

    const getPartsFailure = () => {
        PartsService.getMostCommonFailingParts()
            .then(response => response.json())
            .then(data => {
                console.log("Successfully retrieved most common failing parts: ", data);
                setPartsFailureList(data);
            })
            .catch(error => {
                console.log("Error when retrieving most common failing parts: ", error);
            })
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <div>
            <Box sx={{ flexGrow: 1 }} margin="10px">
                <Grid container spacing={{ xs: 2, md: 3 }} rows={{  xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6} >
                        <Item>
                            <PartsFailureChart data={partsFailureList}/>
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                            <Typography fontWeight="bold" marginBottom="10px">Most Common Failing Parts</Typography>
                            <PartsFailureTable data={partsFailureList}/>
                        </Item>
                    </Grid>
                </Grid>
            </Box>


        </div>

    );


}

export default PartsFailure;



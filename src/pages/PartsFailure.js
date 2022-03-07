import React, {useEffect} from 'react';
import {
    Box,
    Grid,
    styled,
    Paper, Typography
} from '@mui/material';
import PartsFailureTable from "../components/PartsFailureTable";
import {TitleOutlined} from "@mui/icons-material";


const PartsFailure = () => {

    const [partsFailureList, setPartsFailureList] = React.useState([]);

    useEffect(() => {
        getPartsFailure();
        console.log("use effect");
    }, []);

    const getPartsFailure = () => {

        const partsFailureData = [
            {
                partNumber: 67,
                partType: "Wing A",
                repairsCount: 17,
                totalRepairsCost: 750.20,
            },
            {
                partNumber: 35,
                partType: "Motor",
                repairsCount: 15,
                totalRepairsCost: 620.00,
            },
            {
                partNumber: 88,
                partType: "Fuselage",
                repairsCount: 13,
                totalRepairsCost: 478.00,
            },
            {
                partNumber: 25,
                partType: "Gimble",
                repairsCount: 11,
                totalRepairsCost: 340.00,
            },
            {
                partNumber: 59,
                partType: "Propeller",
                repairsCount: 9,
                totalRepairsCost: 290.00,
            },
            {
                partNumber: 13,
                partType: "Wing B",
                repairsCount: 8,
                totalRepairsCost: 230.50,
            }
        ]
        setPartsFailureList(partsFailureData);
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
                        <Item>Item 1</Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                            <Typography>Most Common Failing Parts</Typography>
                            <PartsFailureTable data={partsFailureList}/>
                        </Item>
                    </Grid>
                </Grid>
            </Box>


        </div>

    );


}

export default PartsFailure;



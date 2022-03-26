import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {makeStyles} from "@mui/styles";

function RepairCostCard({icon, value, footer}) {

    const useStyles = makeStyles({
        card: {
            borderRadius: 30
        }
    });

    const classes = useStyles();

    return (
        <Card classes={{root: classes.card}} sx={{minWidth: 275}} borderRadius={100}>
            <CardContent>
                {icon}
                <Typography variant="h3" component="div">
                    {value}
                </Typography>
                <Typography sx={{mb: 1.5}}>
                    {footer}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default RepairCostCard;
import React, { useEffect, useState } from 'react';
import {Paper, Typography, Grid, Autocomplete,TextField,Button, FormControl, Divider} from "@mui/material";
import {Bar} from 'react-chartjs-2';
import {useParams} from "react-router-dom";
import PartsService from '../services/PartsService';

const Location = () => {
    //Make location equal to the location passed via route
    const { location } = useParams();
    const parts = ['Wing A', 'Wing B', 'Fuselage', 'Tail', 'Propeller', 'Motor','Communications Radio','Payload Electo Optical','Payload Infra Red','Gimble','Quad Arm'];
    let stockPercentage = [];
    const [chartData, setChartData] = useState({
        labels: parts,
        datasets: [
            {
                label: "Percentage stock",
                data: [0,0,0,0,0,0,0,0,0,0,0],
                backgroundColor: ["rgba(75, 192, 192, 0.6"],
                borderWidth: 4
            }
        ]
    });

    useEffect(() => {
        PartsService.getLocationStock(location).then(response => response.json()).then(data => {
            for(const dataObj of data){
                stockPercentage.push(parseFloat(dataObj.stockLevelPercentage));
            }
            //sets chart data to data from api 
            setChartData({
                labels: parts,
                datasets: [
                    {
                        label: "Percentage of Stock",
                        data: stockPercentage,
                        backgroundColor: ["#004789"],
                        borderWidth: 1
                    }
                ]
            });
        });
    }, []);
    
    return(
        <div>
            <Grid container>
                <Grid item xs={8}>
                    <Paper elevation={3} sx={{height: "95%", m: 2, p: "1%"}}>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '1.5rem'}}>Stock at {location}</Typography>
                        <Bar 
                            data={chartData}
                            options={{
                                title:{
                                    display:true,
                                    text:"Percentage of Parts",
                                    fontSize:20
                                },
                                scales: {
                                    y: {
                                        min: 0,
                                        max: 100, 
                                        title: {
                                            display: true,
                                            text: "% Stock" 
                                        },
                                    },
                                    x: {
                                        title: {
                                            display: true,
                                            text: "Part Type"
                                        },
                                    },
                                },
                                legend:{
                                    display:false
                                }
                            }} />     
                    </Paper>
                </Grid> 
                <Grid item xs={4}>
                    <Paper elevation={3} sx={{height: "95%", m: 2, p: "1%", pt: "2%" }}>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '1.5rem'}}>Request Stock</Typography>
                        
                        <Divider/>
                        <br/>
                        <FormControl>
                            <Autocomplete options={parts} renderInput={(params) => <TextField {...params} label="Part Type" />}/>
                            <br/>
                            <Divider/>
                            <br/>
                            <TextField type="number" label="Quantity"></TextField>
                            <br/>
                            <Divider/>
                            <br/>
                            <Button variant="contained" sx={{bgcolor:"#004789", ':hover':{bgcolor: "#0060ba"}}}>Submit</Button>
                        </FormControl>
                    </Paper>
                </Grid>   
            </Grid>
        </div>
    );
}
export default Location
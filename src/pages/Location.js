import React, { useEffect, useState } from 'react';
import {Paper, Typography, Grid, Autocomplete,TextField,Button, FormControl, Divider, TableContainer, Table, TableHead, TableRow, TableCell,TableBody, Alert} from "@mui/material";
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

    const [partID, setPartID] = useState("");
    const [quantity, setQuantity] = useState("");
    const [partIDs, setPartIds] = useState([]);
    const [quantities, setQuantities] = useState([]);
    const [supplierEmail, setEmail] = useState("");
    const [order,setOrder] = useState([]);

    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');

    const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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

    const addOrderItem = () => {
        if (partID == "") {
            setAlertSeverity("error");
            setAlertMessage("PartID must be selected!");
            setAlert(true);
            setTimeout(() => { setAlert(false) }, 3000);
        } else if (quantity == "") {
            setAlertSeverity("error");
            setAlertMessage("Quantity must be selected!");
            setAlert(true);
            setTimeout(() => { setAlert(false) }, 3000);
        } else {
            partIDs.push(partID);
            quantities.push(quantity);
            setOrder(order => [...order, [partID,quantity]]);
        }
    }

    const submitOrder = () => {
        if (supplierEmail == ""){
            setAlertSeverity("error");
            setAlertMessage("Supplier email must be selected!");
            setAlert(true);
            setTimeout(() => { setAlert(false) }, 3000);
        } else if (order == "") {
            setAlertSeverity("error");
            setAlertMessage("A minimum of 1 part must be added to the order!");
            setAlert(true);
            setTimeout(() => { setAlert(false) }, 3000);
        } else if (!supplierEmail.match(emailValidator)) {
            setAlertSeverity("error");
            setAlertMessage("A valid email must be entered!");
            setAlert(true);
            setTimeout(() => { setAlert(false) }, 3000);
        } else {
            const request = {location, supplierEmail,partIDs,quantities};
            console.log(JSON.stringify(request));
            PartsService.requestStock(request).then(response => {
                if (response.status == "200"){
                    setAlertSeverity("success");
                    setAlertMessage("Successfully sent stock request!");
                    setAlert(true);
                    setTimeout(() => { setAlert(false) }, 3000);
                } else {
                    setAlertSeverity("error");
                    setAlertMessage("Invalid Stock request!");
                    setAlert(true);
                    setTimeout(() => { setAlert(false) }, 3000);
                }

            }).catch(error => {
                setAlertSeverity("error");
                setAlertMessage("Error communicating with the server!");
                setAlert(true);
                setTimeout(() => { setAlert(false) }, 3000);
            })
        }
    }
    
    return(
        <div>
            {alert ? <Alert className="alertPos" severity={alertSeverity}>{alertMessage}</Alert> : <></> }
            <Grid container>
                <Grid item xs={7}>
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
                <Grid item xs={5}>
                    <Paper elevation={3} sx={{height: "95%", m: 2, p: "1%", pt: "2%" }}>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '1.5rem'}}>Request Stock</Typography>
                        
                        <Divider/>
                        <br/>
                        <FormControl>
                            <TextField type="email" required label="Supplier Email" onChange={(e) => setEmail(e.target.value)}></TextField>


                            <TableContainer sx={{width: "100%",mt: 1, mb: 2}}>
                                <Table size="small" aria-label="table label">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{fontSize: "0.7rem", pt:0, pb:0}}>PartID</TableCell>
                                            <TableCell sx={{fontSize: "0.7rem", pt:0, pb:0}}>Quantity</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {order.map((row) => (
                                            <TableRow key={row}>
                                                <TableCell sx={{fontSize: "0.7rem", pt:0, pb:0}}>{row[0]}</TableCell>
                                                <TableCell sx={{fontSize: "0.7rem", pt:0, pb:0}}>{row[1]}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <Grid container>
                                <Grid item xs={6}>
                                    <TextField required sx={{m:0.5, mt: 2}} type="number" label="PartID" onChange={(e) => setPartID(e.target.value)}></TextField>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField required sx={{m:0.5, mt: 2}} type="number" label="Quantity" onChange={(e) => setQuantity(e.target.value)}></TextField>
                                </Grid>
                            </Grid>

                            
                            <Button onClick={addOrderItem} variant="contained" sx={{mt: 0.5, mb: 2, bgcolor:"#004789", ':hover':{bgcolor: "#0060ba"}}}>Add part and quantity</Button>
                            <Divider/>
                            <Button onClick={submitOrder} variant="contained" sx={{mt: 2, bgcolor:"#004789", ':hover':{bgcolor: "#0060ba"}}}>Submit Invoice</Button>
                        </FormControl>
                    </Paper>
                </Grid>   
            </Grid>
        </div>
    );
}
export default Location
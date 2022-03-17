
import {Paper, Button, TextField, FormControl, TableRow, TableCell, TableContainer, Table, TableHead, TableBody, Grid} from "@mui/material";
import React, {useState} from "react";
import AircraftService from "../../services/AircraftService";

const ModifyAircraft = () => {

    const [tailNumber, setTailNumber] = useState("");
    const[parts, setParts] = useState([[]]);

    const onAircraftSearch = (e) => {
        console.log(tailNumber);
        AircraftService.getAircraftPartsStatus(tailNumber).then(response => response.json()).then(data => {
            setParts(data.parts);
            
        });
        console.log(parts);
    }

    return (
        <div>
            <Paper elevation={3} sx={{width: "95%", margin: "auto", p: "3%", pt: "0%", mt: 2 }}>
                <h1>Modify Aircraft</h1>
                
                <Grid container>
                    <Grid item xs={3}>
                        <FormControl>
                            <TextField label="Aircraft tailnumber" onChange={(e) => setTailNumber(e.target.value)} ></TextField>
                            <br/>
                            <Button variant="contained" onClick={onAircraftSearch}>Search Aircraft</Button>
                        </FormControl>
                    </Grid>

                    <Grid item xs={9}>
                                            
                        <TableContainer sx={{width: "50%"}}>
                            <Table size="small" aria-label="table label">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Part Number</TableCell>
                                        <TableCell>Part Name</TableCell>
                                        <TableCell>Part Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {parts.map((row) => (
                                        <TableRow key={row[0]}>
                                            <TableCell sx={{fontSize: "0.7rem"}}>{row[0]}</TableCell>
                                            <TableCell sx={{fontSize: "0.7rem"}}>{row[1]}</TableCell>
                                            <TableCell sx={{fontSize: "0.7rem"}}>{row[2]}</TableCell>
                                        </TableRow>

                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>



                </Grid>

                    


                    

                

                
                

                


            </Paper>
            



        </div>
    );
}
export default ModifyAircraft;
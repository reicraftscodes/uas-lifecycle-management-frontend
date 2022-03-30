import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";

function AircraftPartCostTable({repairCost}) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Part Name</TableCell>
                        <TableCell align="right">Part Cost</TableCell>
                        <TableCell align="right">Part Status</TableCell>
                        <TableCell align="right">Repair Costs</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {repairCost.map((row) => (
                        <TableRow
                            key={row.partName}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell align="right"><Typography>{row.partName}</Typography></TableCell>
                            <TableCell align="right"><Typography>{row.partCost}</Typography></TableCell>
                            <TableCell align="right"><Typography>{row.partStatus}</Typography></TableCell>
                            <TableCell align="right"><Typography>{row.totalRepairCost.toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'GBP',
                            })}</Typography></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default AircraftPartCostTable;

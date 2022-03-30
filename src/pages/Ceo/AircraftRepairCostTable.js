import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";

function AircraftRepairCostTable({repairs}) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Repair ID</TableCell>
                        <TableCell align="right">Part Type</TableCell>
                        <TableCell align="right">Costs</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {repairs.map((row) => (
                        <TableRow
                            key={row.partName}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell align="right"><Typography>{row.repairID}</Typography></TableCell>
                            <TableCell align="right"><Typography>{row.partType}</Typography></TableCell>
                            <TableCell align="right">
                                <Typography>{row.cost.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'GBP',
                                })}</Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default AircraftRepairCostTable;

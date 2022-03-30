import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function StockPartsLocation({stockPartsLocations}) {
    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Part Number</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell> Stock Count</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stockPartsLocations.map((row) => (
                            <TableRow
                                key={row.partNumber}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {row.partNumber}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.location}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.stockCount}
                                </TableCell>
                            </TableRow>

                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default StockPartsLocation;
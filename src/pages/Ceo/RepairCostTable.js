import * as React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";


function RepairCostTable({data}) {

    const headCells = [
        {
            id: 'tailNumber',
            align: "left",
            label: 'Aircraft Tail Number',
        },
        {
            id: 'repairCost',
            align: "right",
            label: 'Repair Cost (£) ',
        },
        {
            id: 'partCost',
            align: "right",
            label: 'Part Cost (£)',
        },
        {
            id: 'totalCost',
            align: "right",
            label: 'Total Repairs Cost (£)',
        },
    ];

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {headCells.map((headCell) => (
                            <TableCell
                                key={headCell.id}
                                align={headCell.align}
                            >
                                {headCell.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((data) => (
                        <TableRow key={data.tailNumber}>
                            <TableCell style={{ width: 160 }}>
                                {data.tailNumber}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {data.repairCost}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {data.partCost}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {data.totalCost}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default RepairCostTable;
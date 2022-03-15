import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
    Table,
    TableBody,
    TableCell, tableCellClasses,
    TableContainer,
    TableFooter, TableHead,
    TablePagination,
    TableRow, TableSortLabel,
} from "@mui/material";
import {visuallyHidden} from "@mui/utils";
import {TablePaginationActions} from "./TablePaginationActions";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "grey",
        color: theme.palette.common.white,
        fontWeight: "bold",

    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const headCells = [
    {
        id: 'location',
        align: "left",
        label: 'Location',
    },
    {
        id: 'platformType',
        align: "right",
        label: 'Platform',
    },
    {
        id: 'platformStatus',
        align: "right",
        label: 'Status',
    },
    {
        id: 'aircraft',
        align: "right",
        label: 'Aircraft',
    },
    {
        id: 'flightHours',
        align: "right",
        label: 'Flight time (hrs)',
    },
    {
        id: 'totalPartsCost',
        align: "right",
        label: 'Parts Cost',
    },
    {
        id: 'totalRepairs',
        align: "right",
        label: 'Total Repairs',
    },
    {
        id: 'totalRepairsCost',
        align: "right",
        label: 'Total Repairs Cost',
    },
    {
        id: 'totalCost',
        align: "right",
        label: 'Total Cost',
    },

];

export default function PlatformsTable({data}) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer sx={{width: "auto"}} style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"}}>
            <Table style={{ width: "auto", tableLayout: "auto" }}>
                <TableHead>
                    <TableRow>
                        {headCells.map((headCell) => (

                                <StyledTableCell
                                    key={headCell.id}
                                    align={headCell.align}
                                >
                                    {headCell.label}
                                </StyledTableCell>


                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : data
                    ).map((data) => (
                        <TableRow>
                            <TableCell style={{ width: 160 }}>
                                {data.location}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {data.platformType}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {data.platformStatus}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {data.aircraft}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {data.flightHours}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {data.totalPartsCost}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {data.totalRepairs}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {data.totalRepairsCost}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {data.totalCost}
                            </TableCell>
                        </TableRow>
                    ))}

                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 15, 20, { label: 'All', value: -1 }]}
                            colSpan={9}
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}

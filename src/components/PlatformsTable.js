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
import {getComparator, SortTableHead, stableSort} from "./SortTableHead";




const headCells = [
    {
        id: 'location',
        label: 'Location',
    },
    {
        id: 'platformType',
        label: 'Platform',
    },
    {
        id: 'platformStatus',
        label: 'Status',
    },
    {
        id: 'aircraft',
        label: 'Aircraft',
    },
    {
        id: 'flightHours',
        label: 'Flight hours',
    },
    {
        id: 'totalPartsCost',
        label: 'Parts Cost',
    },
    {
        id: 'totalRepairs',
        label: 'Total Repairs',
    },
    {
        id: 'totalRepairsCost',
        label: 'Total Repairs Cost',
    },
    {
        id: 'totalCost',
        label: 'Total Cost',
    },

];

export default function PlatformsTable({data}) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('location');
    const [originalRows, setOriginalRows] = React.useState(data);
    const [rows, setRows] = React.useState(data);

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

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    return (
        <TableContainer sx={{width: "auto"}} style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"}}>
            <Table style={{ width: "auto", tableLayout: "auto" }}>
                <SortTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    headCells={headCells}
                />
                <TableBody>
                    {stableSort(rows, getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                            return (
                                <TableRow key={row.tailNumber}>
                                    <TableCell style={{ width: 160 }}>
                                        {row.location}
                                    </TableCell>
                                    <TableCell style={{ width: 160 }}>
                                        {row.platformType}
                                    </TableCell>
                                    <TableCell style={{ width: 160 }}>
                                        {row.platformStatus}
                                    </TableCell>
                                    <TableCell style={{ width: 160 }}>
                                        {row.tailNumber}
                                    </TableCell>
                                    <TableCell style={{ width: 160 }}>
                                        {row.flyTimeHours}
                                    </TableCell>
                                    <TableCell style={{ width: 160 }}>
                                        {row.partsCost}
                                    </TableCell>
                                    <TableCell style={{ width: 160 }}>
                                        {row.repairsCount}
                                    </TableCell>
                                    <TableCell style={{ width: 160 }}>
                                        {row.repairsCost}
                                    </TableCell>
                                    <TableCell style={{ width: 160 }}>
                                        {row.totalCost}
                                    </TableCell>
                                </TableRow>
                            );
                        })}

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

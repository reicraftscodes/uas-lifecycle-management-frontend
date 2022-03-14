import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import {
    Box,
    IconButton, Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter, TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

// Ref - altered from: https://mui.com/components/tables/
export function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

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
        console.log("handle page change");
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        console.log("handle change rows per page");
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
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

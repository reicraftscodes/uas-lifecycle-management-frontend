import * as React from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter, TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
import {TablePaginationActions} from "./TablePaginationActions";

//Ref: https://mui.com/components/tables/

const headCells = [
    {
        id: 'partNumber',
        align: "left",
        label: 'Part number',
    },
    {
        id: 'partType',
        align: "right",
        label: 'Part Type',
    },
    {
        id: 'repairsCount',
        align: "right",
        label: 'Number of repairs',
    },
    {
        id: 'totalRepairsCost',
        align: "right",
        label: 'Total Repairs Cost (£)',
    },
];

export default function PartsFailureTable({data}) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
                        <TableRow key={data.partNumber}>
                            <TableCell style={{ width: 160 }}>
                                {data.partNumber}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {data.partName}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {data.repairsCount}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {data.totalRepairsCost}
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
                            rowsPerPageOptions={[5, 10, { label: 'All', value: -1 }]}
                            colSpan={4}
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

import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TablePagination,
    TableRow,
} from "@mui/material";
import {TablePaginationActions} from "./TablePaginationActions";
import {getComparator, SortTableHead, stableSort} from "./SortTableHead";
import {useNavigate} from "react-router-dom";
import ViewAircraft from "../pages/Logistic/ViewAircraft";
import {GridApi} from "@material-ui/data-grid";

//Ref: https://mui.com/components/tables/


const headCells = [
    {
        id: 'tailNumber',
        label: 'Aircraft',
    },
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
        id: 'flyTimeHours',
        label: 'Flight hours',
    },
    {
        id: 'viewButton',
        label: '',
    }
];

export default function AllAircraftTable({data}) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('tailNumber');
    const [rows, setRows] = React.useState(data);

    const navigate = useNavigate();

    React.useEffect(() => {
        setRows(data)
    }, [data]);

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
        console.log("handle request sort: event - " + event + ". property - " + property);
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        console.log("handle request sort: order - " + order + ". by - " + orderBy);
    };

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const viewAircraft = (data) => {
        console.log("click");
        return (
            <ViewAircraft aircraftData={data}/>
        )

    }

    const onClick = (params) => {
        navigate(`/view-aircraft/${params.tailNumber}`)
    };

    return (
        <TableContainer sx={{width: "auto"}} style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"}}>
            <Table style={{ width: "auto", height: "auto", tableLayout: "auto"}}>
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
                                <StyledTableRow key={row.tailNumber}>
                                    <TableCell style={{ width: 160 }}>
                                        {row.tailNumber}
                                    </TableCell>
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
                                        {row.flyTimeHours}
                                    </TableCell>
                                    <TableCell style={{ width: 160 }}>
                                        <Button
                                            style={{width: 100, backgroundColor: "#004789"}}
                                            variant="contained"
                                            onClick={()=> onClick({row})}
                                        >View</Button>
                                    </TableCell>
                                </StyledTableRow>
                            );
                        })}

                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter style={{marginBottom: "0px"}}>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 15, 20, { label: 'All', value: -1 }]}
                            colSpan={6}
                            count={rows.length}
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

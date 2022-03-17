import {Box, TableCell, tableCellClasses, TableHead, TableRow, TableSortLabel} from "@mui/material";
import {visuallyHidden} from "@mui/utils";
import * as React from 'react';
import PropTypes from 'prop-types';
import {styled} from "@mui/material/styles";

export function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

export function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
export function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

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

// Ref - altered from: https://mui.com/components/tables/
export function SortTableHead(props) {
    const { order, orderBy, onRequestSort, headCells } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow style={{border: "15px"}}>
                {props.headCells.map((headCell) => (
                    <StyledTableCell
                        key={headCell.id}
                        align={'left'}
                        padding={'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}

                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </StyledTableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

SortTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    headCells: PropTypes.array
};

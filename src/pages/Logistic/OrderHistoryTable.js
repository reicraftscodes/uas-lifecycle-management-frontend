import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import {DataGrid} from '@mui/x-data-grid';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import {createStyles, makeStyles} from "@mui/styles";

function HistoryQuickSearchToolbar(props) {
    return (
        <Box
            sx={{
                p: 0.5,
                pb: 0,
            }}
        >
            <TextField
                variant="standard"
                value={props.value}
                onChange={props.onChange}
                placeholder="Search…"
                InputProps={{
                    startAdornment: <SearchIcon fontSize="small"/>,
                    endAdornment: (
                        <IconButton
                            title="Clear"
                            aria-label="Clear"
                            size="small"
                            style={{visibility: props.value ? 'visible' : 'hidden'}}
                            onClick={props.clearSearch}
                        >
                            <ClearIcon fontSize="small"/>
                        </IconButton>
                    ),
                }}
                sx={{
                    width: {
                        xs: 1,
                        sm: 'auto',
                    },
                    m: (theme) => theme.spacing(1, 0.5, 1.5),
                    '& .MuiSvgIcon-root': {
                        mr: 0.5,
                    },
                    '& .MuiInput-underline:before': {
                        borderBottom: 1,
                        borderColor: 'divider',
                    },
                }}
            />
        </Box>
    );
}

HistoryQuickSearchToolbar.propTypes = {
    clearSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};

function OrderHistoryTable({data}) {
    function escapeRegExp(value) {
        return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    }

    function attachIdToToRow(data) {
        return data.map((element, index) => ({...element, id: index}));
    }

    const [searchText, setSearchText] = React.useState('');
    const [rows, setRows] = React.useState(attachIdToToRow(data));

    const requestSearch = (searchValue) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        const filteredRows = data.filter((row) => {
            return Object.keys(row).some((field) => {
                return searchRegex.test(row[field].toString());
            });
        });
        setRows(attachIdToToRow(filteredRows));
    };

    const columns = [
        {
            field: 'locationName',
            headerName: 'Location Name',
            flex: 1,
            headerClassName: 'grid-header-mui'
        },
        {
            field: 'supplierEmail',
            headerName: 'Supplier Email',
            flex: 1,
            headerClassName: 'grid-header-mui'
        },

        {
            field: 'totalCost',
            headerName: 'Total Cost (£)',
            flex: 1,
            headerClassName: 'grid-header-mui'
        },
        {
            field: 'orderDateTime',
            headerName: 'Order Date Time',
            flex: 1,
            headerClassName: 'grid-header-mui'
        },
        {
            field: 'partName',
            headerName: 'Part Name',
            flex: 1,
            headerClassName: 'grid-header-mui'
        },

        {
            field: 'quantity',
            headerName: 'Quantity',
            type: 'number',
            flex: 1,
            headerClassName: 'grid-header-mui'
        },
    ];

    const useStyles = makeStyles((theme) =>
        createStyles({
            root: {
                "& .MuiDataGrid-columnHeaders": {
                    fontSize: 16,
                }
            }
        })
    );

    const classes = useStyles();

    return (
        <Box sx={{height: 700, width: '100%'}}>
            <DataGrid
                components={{Toolbar: HistoryQuickSearchToolbar}}
                rows={rows}
                columns={columns}
                componentsProps={{
                    toolbar: {
                        value: searchText,
                        onChange: (event) => requestSearch(event.target.value),
                        clearSearch: () => requestSearch(''),
                    },
                }}
                className={classes.root}
            />
        </Box>
    );
}

export default OrderHistoryTable;

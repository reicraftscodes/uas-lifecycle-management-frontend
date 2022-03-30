import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import {DataGrid} from '@mui/x-data-grid';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import {Button} from "@mui/material";
import {createStyles, makeStyles} from "@mui/styles";
import {GridApi} from "@material-ui/data-grid";
import {useNavigate} from "react-router-dom";


function partsQuickSearchToolbar(props) {

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

partsQuickSearchToolbar.propTypes = {
    clearSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};

function ViewListPartsTable({data}) {


    const navigate = useNavigate();

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
            field: 'partNumber',
            headerName: 'Part Number',
            type: 'number',
            flex: 1,
            headerClassName: 'grid-header-mui'
        },
        {
            field: 'partType',
            headerName: 'Part Type',
            type: 'number',
            flex: 1,
            headerClassName: 'grid-header-mui'
        },
        {
            field: 'cost',
            headerName: 'Part Cost (£)',
            type: 'number',
            flex: 1,
            headerClassName: 'grid-header-mui'
        },

        {
            field: 'typicalFailureHours',
            headerName: 'Typical Failure Hours',
            type: 'number',
            flex: 1,
            headerClassName: 'grid-header-mui'
        },

        {
            field: 'compatiblePlatforms',
            headerName: 'Compatible Platforms',
            flex: 1,
            headerClassName: 'grid-header-mui'
        },

        {
            field: "action",
            headerName: "Stock Locations",
            sortable: false,
            flex: 1,
            renderCell: (params) => {
                const onClick = (e) => {
                    e.stopPropagation();

                    const api: GridApi = params.api;
                    const thisRow: Record<string, GridCellValue> = {};

                    api
                        .getAllColumns()
                        .filter((c) => c.field !== "__check__" && !!c)
                        .forEach(
                            (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
                        );

                    navigate(`/view-parts/${thisRow.partNumber}`)
                };

                return <Button variant="contained" style={{backgroundColor: '#161144'}} onClick={onClick}>View
                    location</Button>;
            }
        },
    ];

    const useStyles = makeStyles((theme) =>
        createStyles({
            root: {
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#808080",
                    fontSize: 16
                }
            }
        })
    );

    const classes = useStyles();


    return (
        <Box sx={{height: 700, width: '100%'}}>
            <DataGrid
            components={{Toolbar: partsQuickSearchToolbar}}
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

export default ViewListPartsTable;
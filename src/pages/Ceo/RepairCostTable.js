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
import Typography from "@mui/material/Typography";
import {Grid} from "@material-ui/core";
import {useNavigate} from "react-router-dom";

function QuickSearchToolbar(props) {
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

QuickSearchToolbar.propTypes = {
    clearSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};

function RepairCostTable({data}) {
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
            field: 'tailNumber',
            headerName: 'Aircraft Tail Number',
            flex: 1,
            headerClassName: 'grid-header-mui'
        },
        {
            field: 'repairCost',
            headerName: 'Repair Cost (£)',
            type: 'number',
            flex: 1,
            headerClassName: 'grid-header-mui',
            renderCell: (params) => {
                console.log(params)
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

                    navigate("/aircraft-cost/repair/" + thisRow.tailNumber)
                };

                return <>
                    <Grid container spacing={1}>
                        <Grid item xs={9}>
                            <Button variant="contained" style={{backgroundColor: '#004789'}} onClick={onClick}>View
                                Repairs</Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography>{params.formattedValue}</Typography>
                        </Grid>
                    </Grid>
                </>
            }
        },
        {
            field: 'partCost',
            headerName: 'Part Cost (£)',
            type: 'number',
            flex: 1,
            headerClassName: 'grid-header-mui',
            renderCell: (params) => {
                console.log(params)
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
                    navigate("/aircraft-cost/part/" + thisRow.tailNumber)
                };

                return <>
                    <Grid container spacing={1}>
                        <Grid item xs={9}>
                            <Button variant="contained" style={{backgroundColor: '#004789'}} onClick={onClick}>View
                                Parts</Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography>{params.formattedValue}</Typography>
                        </Grid>
                    </Grid>
                </>
            }
        },
        {
            field: 'totalCost',
            headerName: 'Total Cost (£)',
            type: 'number',
            flex: 1,
            headerClassName: 'super-app-theme--header'
        }
    ];

    const useStyles = makeStyles((theme) =>
        createStyles({
            root: {
                "& .MuiDataGrid-columnHeaders": {
                    fontSize: 16
                }
            }
        })
    );

    const classes = useStyles();

    return (
        <Box sx={{height: 700, width: '100%'}}>
            <DataGrid
                components={{Toolbar: QuickSearchToolbar}}
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

export default RepairCostTable;

import {CircularProgress, Grid, Stack, Typography} from "@mui/material";

export default function Spinner() {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{minHeight: '100vh'}}
        >
            <Stack spacing={2} alignItems="center" justifyContent="center">
                <CircularProgress color="inherit"/>
                <Typography variant="subtitle1">This may take a few seconds, please don't close this
                    page </Typography>
            </Stack>
        </Grid>
    );

}
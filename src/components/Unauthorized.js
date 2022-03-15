import {Container, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const unauthorized = () => {
    return (
        <Container>
            <Typography variant="h3"> 404 Page not found</Typography>
            <Typography variant="h5"> We are sorry...</Typography>
            <Typography variant="body1"> The page you are trying has restricted access. Please try again </Typography>
            <Link to="/">
                <button type="button">
                    Go back
                </button>
            </Link>
        </Container>);
}


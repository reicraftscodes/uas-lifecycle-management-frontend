import {Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {getUserDashboard} from "../util/util";
import unAuthImg from "../assets/undraw_warning.png";

const Unauthorized = () => {

    const buttonStyle = {
        height: '70px',
        width: 380,
        margin: "20px auto",
        backgroundColor: "#FFFFFF",
        color: "#DA5A5A",
        borderColor:"#DA5A5A",
        fontSize: "23px",
        borderWidth: "10px",
        border: "2px solid #DA5A5A"
    };
    const textStyle = {margin: "10px auto", color:"#DA5A5A"};
    const user = useSelector((state) => state.user)

    const navigate = useNavigate();

    const backToDashboardPage = () => {
        navigate(getUserDashboard(user.info.roles[0]))
    }

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{minHeight: '100vh'}}
        >
            <img src={unAuthImg} alt="unauthorised" height="250" width="300"></img>
            <Typography style={textStyle} variant="h3"> 404 Page not found</Typography>
            <Typography variant="h5"> We are sorry...</Typography>
            <Typography variant="body1"> The page you are trying has restricted access. Please try again.</Typography>
            <button style={buttonStyle} variant="outlined" onClick={backToDashboardPage}> Go back</button>
        </Grid>)
}

export default Unauthorized;

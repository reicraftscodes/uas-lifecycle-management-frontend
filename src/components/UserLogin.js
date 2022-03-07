import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {Button, Checkbox, FormControlLabel, Grid, Link, Paper, TextField, Typography} from "@mui/material";
import Logo from '../assets/logo.png';


// Login Page functionality
function UserLogin() {

    //custom paper style
    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    //
    // // user input state variables
    // const [session, setSession] = useState()
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    // const [roles, setRoles] = useState('');
    // const history = useHistory();
    //
    // // Get Login form
    // const getLoginHeader = () => {
    //
    //     //TODO Calls getLogin service
    //
    // }
    //
    // // UseEffect functionality
    // useEffect( () => {
    //
    //
    // }, [] )

    return(
        <Grid>
            <Paper elevation={4} style={paperStyle}>
                <Grid align='center'>
                    <img src={Logo} id="sncLogo"/>
                    <h2>Sign In</h2>
                </Grid>
                <TextField label='Email' placeholder='Enter your email' fullWidth required/>
                <TextField label='Password' placeholder='Enter your password' type='password' fullWidth required/>
                <Button type='submit' color='primary' variant="contained" > fullWidth>Sign in</Button>
                <Typography >
                    <Link href="#" >
                        Forgot password ?
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default UserLogin;
import React, {useEffect, useState} from 'react';
import {Button, Divider, FormControl, Grid, Link, Paper, TextField, Typography} from "@mui/material";
import Logo from '../assets/logo.png';
import AuthService from '../services/auth.service';


// Login Page functionality
function UserLogin() {

    //custom paper style
    const paperStyle={padding :20,height:'70vh',width:380, margin:"20px auto"}

    // user input state variables
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");


    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };
    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };
    const handleLogin = (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);
    //    Auth service will go here:

    };
    return(
        <Grid>
            <Paper elevation={4} style={paperStyle}>
                <Grid align='center'>
                    <img src={Logo} id="sncLogo" height="50px" width="150px" />
                    <h4>Sign In</h4>
                </Grid>
                <FormControl>
                <TextField label='Email' placeholder='Enter your email'/>
                <br/>
                <TextField label='Password' placeholder='Enter your password' type='password'/>
                <br/>
                <Button type='submit' color='primary' variant="contained" > Login </Button><br/>
                <Typography >
                    <Link href="#" >
                        Forgot password ?
                    </Link>
                </Typography>
                </FormControl>
            </Paper>
        </Grid>
    )
}

export default UserLogin;
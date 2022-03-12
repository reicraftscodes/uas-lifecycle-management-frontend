import React, {useEffect, useState} from 'react';
import {Box, Button, Divider, FormControl, Grid, Link, Paper, TextField, Typography} from "@mui/material";
import Logo from '../assets/logo.png';
import {login} from '../services/authService';
import CheckButton from "react-validation/build/button";


// Login Page functionality
function UserLogin() {

    //custom paper style
    const paperStyle = {padding: 20, height: '70vh', width: 380, margin: "20px auto"}

    // user input state variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const onChangeUsername = (e) => {
        const email = e.target.value;
        setEmail(email);
    };
    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };
    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);

        login(email, password, (data) => {
            if (data.status === "BAD_REQUEST") {
                setMessage(data.message)
            } else {

            }
        });

    };
    return (
        <Grid>
            <Paper elevation={4} style={paperStyle}>
                <Grid align='center'>
                    <img src={Logo} id="sncLogo" height="50px" width="160px" margin="20px"/>
                    <h4>Sign In</h4>
                </Grid>
                <FormControl>
                    <TextField
                        label='Email'
                        placeholder='Enter your email'
                        onChange={onChangeUsername}
                        value={email}
                        error
                        id="outlined-error"
                        label="Please enter your email again."
                    />
                    <br/>
                    <TextField label='Password'
                               placeholder='Enter your password'
                               type='password'
                               onChange={onChangePassword}
                               value={password}
                               error
                               id="outlined-error"
                               label="Enter your password again."
                    />
                    <br/>
                    <Button type='submit' _disabled={loading} color='primary' variant="contained" onClick={handleLogin}
                            isLoading={loading}> Login </Button><br/>
                    {message && (
                        <Box
                            sx={{ width: 1 }}
                            className="alert alert-danger uas"
                            role="alert"
                        >
                            <b>{message}</b>
                        </Box>
                    )}
                    <Typography>
                        <Link href="#">
                            Forgot password ?
                        </Link>
                    </Typography>
                </FormControl>
            </Paper>
        </Grid>
    )
}

export default UserLogin;
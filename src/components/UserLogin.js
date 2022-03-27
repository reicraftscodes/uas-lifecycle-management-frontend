import React, {useState} from 'react';
import {Box, Button, FormControl, Grid, Paper, TextField, Typography} from "@mui/material";
import Logo from '../assets/images/logo.png';
import AuthService from '../services/AuthService';
import {useDispatch} from 'react-redux'
import {useNavigate} from "react-router-dom";
import {loginSuccess} from "../actions/actions";
import {getUserDashboard} from "../util/util";


function UserLogin() {

    const paperStyle = {padding: 20, height: '55vh', width: 380, margin: "20px auto"}
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [isEmailInvalid, setIsEmailInvalid] = useState(false)
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChangeUsername = (e) => {
        const email = e.target.value;
        setEmail(email);
    };
    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const validate = () => {
        let isOkay = true;
        if (email.length === 0) {
            setIsEmailInvalid(true)
        }

        if (password.length === 0) {
            setIsPasswordInvalid(true)
            isOkay = false;
        }
        return isOkay;
    }

    const handleLogin = (e) => {
        e.preventDefault();
        if (validate()) {
            setLoading(true);

            AuthService.login(email, password)
                .then((response) => response.json())
                .then(data => {
                    setLoading(false);
                    if (data.token) {
                        localStorage.setItem("user", JSON.stringify(data));
                    }

                    if (data.status === "BAD_REQUEST") {
                        setMessage(data.message)
                    } else {
                        dispatch(loginSuccess(data))
                        navigate(getUserDashboard(data.roles[0]));
                    }
                });
        }

    };
    return (
        <Grid container justify = "center">
            <Paper elevation={4} style={paperStyle}>
                <Grid align='center'>
                    <img src={Logo} id="sncLogo" height="50px" width="160px" margin="20px" alt="Sierra Nevada Corporation Logo"/>
                    <Typography variant="h5">Sign In</Typography>
                </Grid>
                <FormControl>
                    <TextField
                        required
                        label='Email'
                        placeholder='Enter your email'
                        onChange={onChangeUsername}
                        value={email}
                        id="outlined-error"
                        error={isEmailInvalid}
                        data-cy="email"
                        helperText={isEmailInvalid && "Email is required."}
                    />
                    <br/>
                    <TextField
                        required
                        label='Password'
                        placeholder='Enter your password'
                        type='password'
                        onChange={onChangePassword}
                        value={password}
                        data-cy="password"
                        id="outlined-error"
                        error={isPasswordInvalid}
                        helperText={isPasswordInvalid && "Password is required."}
                    />
                    <br/>
                    <Button type='submit' data-cy="login-button" _disabled={loading} style={{backgroundColor: "#004789"}} variant="contained" onClick={handleLogin}
                            isLoading={loading}> Login </Button><br/>
                    {message && (
                        <Box
                            sx={{width: 1}}
                            className="alert alert-danger uas"
                            role="alert"
                            data-cy="login-error"

                        >
                            <b>{message}</b>
                        </Box>
                    )}
                </FormControl>
            </Paper>
        </Grid>
    )
}

export default UserLogin;
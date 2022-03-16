import React, {useState} from 'react';
import {Box, Button, FormControl, Grid, Link, Paper, TextField, Typography} from "@mui/material";
import Logo from '../assets/images/logo.png';
import AuthService from '../services/AuthService';
import {useDispatch} from 'react-redux'
import {useNavigate} from "react-router-dom";
import {loginSuccess} from "../actions/actions";
import {getUserDashboard} from "../util/util";


function UserLogin() {

    const paperStyle = {padding: 20, height: '70vh', width: 380, margin: "20px auto"}
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
        <Grid>
            <Paper elevation={4} style={paperStyle}>
                <Grid align='center'>
                    <img src={Logo} id="sncLogo" height="50px" width="160px" margin="20px"/>
                    <h4>Sign In</h4>
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
                        id="outlined-error"
                        error={isPasswordInvalid}
                        helperText={isPasswordInvalid && "Password is required."}
                    />
                    <br/>
                    <Button type='submit' _disabled={loading} color='primary' variant="contained" onClick={handleLogin}
                            isLoading={loading}> Login </Button><br/>
                    {message && (
                        <Box
                            sx={{width: 1}}
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
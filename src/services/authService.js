import configData from "../config/ApiConfig.json"

import {user} from "../reducers/userReducer";

// const BASE_API_URL = "http://localhost:8080";

export const login = (email, password, callback) => {
    fetch(configData.API_URL + '/api/auth/signin',{
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then((data) => {
        callback(data)
        if (data.token) {
            localStorage.setItem("user", JSON.stringify(data));
        }
    })
    .catch(error => {
        console.log('request failed', error)
    } );
};

// get stored user information including JWT
export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};


export const getUserInfo = () => {
    fetch(configData.API_URL + '/getUserInfo', {
        method: "GET",
        headers: {
            "Content-Type":"application/json" },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
};


export const getJwtInfo = () => {
    fetch(configData.API_URL + '/api/auth/getJwtInfo',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem(user) ? JSON.parse(localStorage.getItem(user)).token : ""
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};






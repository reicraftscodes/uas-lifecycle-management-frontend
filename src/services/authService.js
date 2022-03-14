import configData from "../config/ApiConfig.json";

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

export const getJwtInfo = () => {
    fetch(configData.API_URL + '/api/auth/getJwtInfo',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
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






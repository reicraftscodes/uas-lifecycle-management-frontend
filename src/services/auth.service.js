const AUTH_API_URL = "http://localhost:8080/api/auth/";

const login = (username, password) => {
    fetch(AUTH_API_URL,{
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ username, password })
    })
        // convert to json
        .then(response => response.json())
        // print data
        // .then(json => console.log(json))
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        })
        //catch errors
        .catch(error => {
            console.log('request failed', error)
        } );
};


const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

export default {
    login,
    getCurrentUser
};













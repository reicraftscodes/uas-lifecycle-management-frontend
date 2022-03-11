const AUTH_API_URL = "http://localhost:8080/api/auth/signin";

export const login = (email, password, callback) => {
    fetch(AUTH_API_URL,{
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












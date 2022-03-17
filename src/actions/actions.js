export const loginSuccess = (user) =>{
    return {type: "LOGIN_SUCCESS", payload: user}
}

export const logOut = () =>{
    return{type: "LOGOUT"}

}

export const fetchJwtTokenSuccess = (info) => {
    return {type: "FETCH_JWT_TOKEN_SUCCESS", payload: info};
}


export const fetchJwtTokenError = () => {
    return {type: "FETCH_JWT_TOKEN_ERROR"};
}
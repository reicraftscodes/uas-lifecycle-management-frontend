export const loginSuccess = (user) =>{
    return {type: "LOGIN_SUCCESS", payload: user}
}

export const logOut = () =>{
    return{type: "LOGOUT"}

}

export const fetchJwtTokenSuccess = (jwtInfo) => {
    return {type: "FETCH_JWT_TOKEN_SUCCESS", payload: jwtInfo};
}


export const fetchJwtTokenError = () => {
    return {type: "FETCH_JWT_TOKEN_ERROR"};
}


export const fetchUserInfo = (userInfo) => {
    return {type: "FETCH_USER_INFO", payload: userInfo};
}
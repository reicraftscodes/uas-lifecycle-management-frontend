export const loginSuccess = (user) =>{
    return {type: "LOGIN_SUCCESS", payload: user}
}

export const logOut = () =>{
    return{type: "LOGOUT"}

}
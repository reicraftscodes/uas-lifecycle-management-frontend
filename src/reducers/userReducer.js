const initialState = {
    isLoggedIn: false,
    info: {
        "token": "",
        "id": 0,
        "username": "",
        "email": "",
        "roles": []
    }
}

export const user = (state = initialState, action) => {

    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                isLoggedIn: true,
                info: action.payload
            }
        case "FETCH_JWT_TOKEN_SUCCESS":
            return {isLoggedIn: true,
                info: action.payload
            }
        case "LOGIN_ERROR":
            return {
                isLoggedIn: false
            }
        case "FETCH_JWT_TOKEN_ERROR":
            return {
                isLoggedIn: false,
                info: initialState.info
            }

        case "LOGOUT":
            return initialState
        default:
            return state;
    }

}


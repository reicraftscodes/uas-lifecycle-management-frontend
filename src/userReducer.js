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
        case "LOGOUT":
            return initialState

        default:
            return state;
    }

}



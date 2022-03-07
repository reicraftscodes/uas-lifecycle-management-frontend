import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";


// Login Page functionality
function UserLogin() {

    // user input state variables
    const [session, setSession] = useState()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [roles, setRoles] = useState('');
    const history = useHistory();

    // Get Login form
    const getLoginHeader = () => {

        //TODO Calls getLogin service

    }

    // UseEffect functionality
    useEffect( () => {


    }, [] )

    //TODO Submit login details

        // TODO Call login user functionality

    }

    return(
        <div id="form">Login</div>
    );
}

export default UserLogin;
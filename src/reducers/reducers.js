import {combineReducers} from "redux";
import {user} from "./userReducer";
import {userInfo} from "./userReducer";


export default combineReducers({
    user,
    userInfo,
});
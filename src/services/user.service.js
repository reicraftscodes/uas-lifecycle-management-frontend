import configData from "../config/ApiConfig.json";


const getPublicUserContent = () => {
    return fetch(configData.API_URL+ + "all",{
        method: "GET",
        headers: {"Content-Type":"application/json" },
    });
};


const getCtoBoard = () => {
    return fetch(configData.API_URL + "cto",{
        method: "GET",
        headers: {"Content-Type":"application/json"}
    });
};

const getCeoBoard = () => {
    return fetch(configData.API_URL + "ceo",{
        method: "GET",
        headers: {"Content-Type":"application/json"}
    });
};

export default {
    getPublicUserContent,
    getCeoBoard,
    getCtoBoard
};

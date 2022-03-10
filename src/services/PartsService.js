import React from 'react'
import configData from "../config/ApiConfig.json"

class PartsService {

    getMostCommonFailingParts () {
        return fetch(configData.API_URL + "/parts/most-failing/5" , {
            method: "GET",
            headers: {"Content-Type":"application/json" },
        });
    }
}

export default new PartsService();

import React from 'react'
import configData from "../config/ApiConfig.json"

class AircraftService {
    logFlightHours(user) {
        return fetch(configData.API_URL +'/aircraft/user/'+user, {
            method: 'GET',
            headers: {"Content-Type": "application/json" },
        });
    }
}

export default new AircraftService();
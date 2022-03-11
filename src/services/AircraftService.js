import React from 'react'
import configData from "../config/ApiConfig.json"

class AircraftService {
    getUserAircraft(user) {
        return fetch(configData.API_URL +'/aircraft/user/'+user, {
            method: 'GET',
            headers: {"Content-Type": "application/json" },
        });
    }

    setAircraftFlytime(request){
        return fetch(configData.API_URL+'/aircraft/log-flight', {
            method: 'POST',
            headers: {"Content-Type": "application/json" },
            body: JSON.stringify(request),
        });
    }
}
export default new AircraftService();
import React from 'react'
import configData from "../config/ApiConfig.json"

class PartsService {

    getMostCommonFailingParts () {
        return fetch(configData.API_URL + "/parts/most-failing/5" , {
            method: "GET",
            headers: {"Content-Type":"application/json" },
        });
    }

    getLocationStock(location) {
        return fetch(configData.API_URL + "/parts/location/stock?location="+location, {
            method: "GET",
            headers: {"Content-Type":"application/json" },
        });
    }

    getFailingTime(){
        return fetch(configData.API_URL + "/parts/failuretime", {
            method: "GET",
            headers: {"Content-Type":"application/json" },
        });
    }

    getAvailablePartsByType(type){
        return fetch(configData.API_URL+"/parts/get-by-type", {
            method: "POST",
            headers: {"Content-Type":"application/json" },
            body: type
        });
    }

    getLowStackParts(){
        return fetch(configData.API_URL + "/parts/low-stock", {
            method: "GET",
            headers: {"Content-Type":"application/json" },
        });
    }

    getViewListParts(){
        return fetch(configData.API_URL + "/parts/all", {
            method: "GET",
            headers: {"Content-Type":"application/json" },
        });
    }

    getOrderHistory(){
        return fetch(configData.API_URL + "/parts/stock-order/all", {
            method: "GET",
            headers: {"Content-Type":"application/json" },
        });


    }

}

export default new PartsService();

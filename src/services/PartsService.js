import configData from "../config/ApiConfig.json"
import AuthService from "./AuthService";

class PartsService {

    getMostCommonFailingParts() {
        return fetch(configData.API_URL + "/parts/most-failing/5", {
            method: "GET",
            headers: {"Content-Type": "application/json",
                'Authorization' : `Bearer ${AuthService.getCurrentUser().token}`},
        });
    }

    getLocationStock(location) {
        return fetch(configData.API_URL + "/parts/location/stock?location=" + location, {
            method: "GET",
            headers: {"Content-Type": "application/json",
                'Authorization' : `Bearer ${AuthService.getCurrentUser().token}`},
        });
    }

    getFailingTime() {
        return fetch(configData.API_URL + "/parts/failuretime", {
            method: "GET",
            headers: {"Content-Type": "application/json",
                'Authorization' : `Bearer ${AuthService.getCurrentUser().token}`},
        });
    }

    getAvailablePartsByType(type) {
        return fetch(configData.API_URL + "/parts/get-by-type/"+ type , {
            method: "GET",
            headers: {"Content-Type": "application/json",
            'Authorization' : `Bearer ${AuthService.getCurrentUser().token}`}
        });
    }

    getLowStackParts() {
        return fetch(configData.API_URL + "/parts/low-stock", {
            method: "GET",
            headers: {"Content-Type": "application/json",
                'Authorization' : `Bearer ${AuthService.getCurrentUser().token}`},
        });
    }

    getViewListParts() {
        return fetch(configData.API_URL + "/parts/all", {
            method: "GET",
            headers: {"Content-Type": "application/json",
                'Authorization' : `Bearer ${AuthService.getCurrentUser().token}`},
        });
    }


    getOrderHistory() {
        return fetch(configData.API_URL + "/parts/stock-order/all", {
            method: "GET",
            headers: {"Content-Type": "application/json",
                'Authorization' : `Bearer ${AuthService.getCurrentUser().token}`},
        });


    }


}

export default new PartsService();

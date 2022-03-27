import React from 'react'
import configData from "../config/ApiConfig.json"
import AuthService from "./AuthService";

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

    getPlatformStatus() {
        return fetch(configData.API_URL +'/aircraft/platform-status/', {
            method: 'GET',
            headers: {"Content-Type": "application/json" },
        });
    }

    getFilterPlatformStatus(request){
        return fetch(configData.API_URL+'/aircraft/platform-status/filter', {
            method: 'POST',
            headers: {"Content-Type": "application/json" },
            body: JSON.stringify(request),
        });
    }

    addAircraft(request){
        return fetch(configData.API_URL+"/aircraft/add" , {
            method: "POST",
            headers: {"Content-Type":"application/json" },
            body: JSON.stringify(request),
        });
    }

    assignAircraft(request){
        return fetch(configData.API_URL+"/aircraft/assign-user" , {
            method: "POST",
            headers: {"Content-Type":"application/json" },
            body: JSON.stringify(request),
        });
    }

    getAllAircraft() {
        return fetch(configData.API_URL +'/aircraft/all', {
            method: 'GET',
            headers: {"Content-Type": "application/json" },
        });
    }

    getFilteredAircraft(request){
        return fetch(configData.API_URL+'/aircraft/all/filter', {
            method: 'POST',
            headers: {"Content-Type": "application/json" },
            body: JSON.stringify(request),
        });
    }

    getAircraftPartsStatus(request){
        return fetch(configData.API_URL+"/aircraft/aircraft-parts-status", {
            method: "POST",
            headers: {"Content-Type":"application/json"} ,
            body: request,
        });
    }

    updateAircraftStatus(request){
        return fetch(configData.API_URL+"/aircraft/update-aircraft-status", {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(request),
        });
    }

    updateAircraftPart(request){
        return fetch(configData.API_URL+"/aircraft/update-aircraft-part", {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(request),
        });
    }

    getCeoAircraftCost(){
        return fetch(configData.API_URL+ "/aircraft/ceo-aircraft-cost",{
            method: 'GET',
            headers: {"Content-Type": "application/json",
                'Authorization' : `Bearer ${AuthService.getCurrentUser().token}`
            },
        });
    }

    getCeoOverallAircraftCost(){
        return fetch(configData.API_URL + "/aircraft/ceo-aircraft-full-cost",{
            method: 'GET',
            headers: {"Content-Type": "application/json" ,
                'Authorization' : `Bearer ${AuthService.getCurrentUser().token}`},
        })
    }

    getNeedAircraftRepair(){
        return fetch(configData.API_URL + "/aircraft/needing-repair", {
            method: "GET",
            headers: {"Content-Type":"application/json" },
        });
    }

}
export default new AircraftService();

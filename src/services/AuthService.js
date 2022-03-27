import configData from "../config/ApiConfig.json";
class AuthService {

    login(email, password) {
        return fetch(configData.API_URL + '/api/auth/signin', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password})
        })
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    };

    getJwtInfo = () => {
        return fetch(configData.API_URL + '/api/auth/getJwtInfo', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${this.getCurrentUser().token}`
            }
        })
    }

}

export default new AuthService();




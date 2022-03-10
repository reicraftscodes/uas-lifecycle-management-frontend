
//this code checks Local Storage for user item. If there is a logged in user with jwt access token ,
// return HTTP Authorization header. Otherwise, return an empty object.
function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.accessToken) {
        return { Authorization: 'Bearer ' + user.accessToken };
    } else {
        return {};
    }
}

export default authHeader;
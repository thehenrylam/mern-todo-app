import jwt_decode from "jwt-decode";

function checkAuthenticated() {
    var loggedIn = true;

    // Check for token to keep user logged in
    if (localStorage.jwtToken) {
        // Set auth token header auth
        const token = localStorage.jwtToken;
        // Decode token and get user info and exp
        const decoded = jwt_decode(token);

        // Check for expired token
        const currentTime = Date.now() / 1000; // to get in milliseconds
        if (decoded.exp < currentTime) {
            loggedIn = false;
        }
    } else {
        loggedIn = false;
    }

    return loggedIn;
};

export default checkAuthenticated;
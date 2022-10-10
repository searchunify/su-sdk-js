const { AUTHENTICATION } = require("./constants");

exports.getAuthHeader = () => {
    let authHeader = null
    switch (AUTHENTICATION.AUTH_TYPE) {
        case 'oauth2':
            authHeader = `Bearer ${AUTHENTICATION.OAUTH2.ACCESS_TOKEN}`;
            break;

        case 'apiKey':
            authHeader = `ApiKey ${AUTHENTICATION.OAUTH2.ACCESS_TOKEN}`;
            break;

        case 'jwt':
            authHeader = `Jwt ${AUTHENTICATION.API_KEY.API_KEY_TOKEN}`;
            break;
    }

    return authHeader;
};
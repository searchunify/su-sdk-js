const qs = require('qs');
const { HttpRequest } = require("../../utils/request-handler");
const validation = require("./../../validations");
const { AUTHENTICATION } = require("./../../utils/constants");
const { AUTH_API } = require("../../utils/su-apis")
const { validateClient, validateOauthClient } = require("../../validations/client/start-client-validation")

const generateToken = async (params) => {
    const isValid = validation.oauth2.accessTokenValidation(params, validateOauthClient());
    if (isValid.error) throw new Error(isValid.error.message);
    let authHeader = Buffer.from(isValid.value.clientId + ":" + isValid.value.clientSecret).toString('base64');

    const queryStrings = qs.stringify({
        grant_type: 'password',
        username: isValid.value.username,
        password: isValid.value.password
    });

    const options = {
        method: 'post',
        url: `${AUTHENTICATION.INSTANCE_URL}${AUTH_API.TOKEN}`,
        data: queryStrings,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${authHeader}`,
            'Cache-Control': 'no-cache'
        }
    }

    let { data, status, message } = await HttpRequest(options);
    if (status && data.accessToken) {
        AUTHENTICATION.OAUTH2.ACCESS_TOKEN = data.accessToken;
        AUTHENTICATION.OAUTH2.REFRESH_TOKEN = data.refreshToken;
        AUTHENTICATION.AUTH_TYPE = 'oauth2';
        AUTHENTICATION.OAUTH2.CLIENT_ID = isValid.value.clientId;
        AUTHENTICATION.OAUTH2.CLIENT_SECRET = isValid.value.clientSecret;
        return 'Token generated successfully.';
    }
    else {
        throw new Error(`Client not initilized. Error message (${message})`);
    }
}

const getRefreshedToken = async () => {
    validateClient();
    const queryStrings = qs.stringify({
        grant_type: 'refresh_token',
        client_id: AUTHENTICATION.OAUTH2.CLIENT_ID,
        client_secret: AUTHENTICATION.OAUTH2.CLIENT_SECRET,
        refresh_token: AUTHENTICATION.OAUTH2.REFRESH_TOKEN
    });

    let options = {
        method: 'post',
        url: `${AUTHENTICATION.INSTANCE_URL}${AUTH_API.TOKEN}`,
        data: queryStrings,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cache-Control': 'no-cache'
        }
    }
    let { data, status, message } = await HttpRequest(options);
    if (status && data.accessToken) {
        AUTHENTICATION.OAUTH2.ACCESS_TOKEN = data.accessToken;
        AUTHENTICATION.OAUTH2.REFRESH_TOKEN = data.refreshToken;
        AUTHENTICATION.AUTH_TYPE = 'oauth2';
        return 'Token refreshed successfully.';
    }
    else {
        throw new Error(`Token not refreshed. Error message (${message})`);
    }
}

module.exports = {
    generateToken,
    getRefreshedToken
}
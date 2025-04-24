const qs = require('qs');
const { HttpRequest, requestMethods } = require('./request-handler');
const { AUTH_API } = require('./su-apis');
const { AUTH_TYPES } = require('./constants');

class Authentication {
  constructor(props = {}) {
    this.timeout = props.timeout;
    this.instance = props.instance;
    this.authType = props.authType;
    this.oAuth2 = props.oauth2 || {};
    this.oAuthTokens = {};
    this.jwt = props.jwt || {};
    this.apiKey = props.apiKey || {};
  }

  getOauthTokens() {
    return this.oAuthTokens;
  }

  getOauthCreds() {
    return this.oAuth2;
  }

  getAuthType() {
    return this.authType;
  }

  setOauthTokens(props) {
    this.oAuthTokens = props;
    this.authType = this.authType || AUTH_TYPES.PASSWORD;
  }

  refreshOauthTokens(props) {
    if (props.accessToken) {
      this.oAuthTokens.accessToken = props.accessToken;
    }
    if (props.refreshToken) {
      this.oAuthTokens.refreshToken = props.refreshToken;
    }
  }

  generateToken = async () => {
    const authHeader = Buffer.from(`${this.oAuth2.clientId}:${this.oAuth2.clientSecret}`).toString('base64');
    let queryStrings;
    if (this.authType === AUTH_TYPES.CLIENT_CREDENTIALS) {
      queryStrings = qs.stringify({
        grant_type: 'client_credentials'
      });
    } else {
      queryStrings = qs.stringify({
        grant_type: 'password',
        username: this.oAuth2.username,
        password: this.oAuth2.password
      });
    }

    const options = {
      timeout: this.timeout,
      method: requestMethods.post,
      url: `${this.instance}${AUTH_API.TOKEN}`,
      data: queryStrings,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${authHeader}`,
        'Cache-Control': 'no-cache'
      },
      defaultHeaders: false
    };

    const { data, status, message } = await HttpRequest(options, this);
    if (status && data.accessToken) {
      this.setOauthTokens(data);

      return 'Token generated successfully.';
    }

    throw new Error(`Client not initilized. Error message (${message})`);
  };

  getRefreshedToken = async () => {
    const queryStrings = qs.stringify({
      grant_type: 'refresh_token',
      client_id: this.getOauthCreds().clientId,
      client_secret: this.getOauthCreds().clientSecret,
      refresh_token: this.getOauthTokens().refreshToken
    });

    const options = {
      timeout: this.timeout,
      method: requestMethods.post,
      url: `${this.instance}${AUTH_API.TOKEN}`,
      data: queryStrings,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cache-Control': 'no-cache'
      },
      defaultHeaders: false
    };
    const { data, status, message } = await HttpRequest(options, this);
    if (status && data.accessToken) {
      this.refreshOauthTokens(data);

      return 'Token refreshed successfully.';
    }

    throw new Error(`Token not refreshed. Error message (${message})`);
  };

  getAuthHeader = async () => {
    let authHeader = null;
    if (!this.authType || this.authType === AUTH_TYPES.PASSWORD) {
      if (this.oAuth2) {
        await this.generateToken();
      }
    }
    if (this.authType === AUTH_TYPES.CLIENT_CREDENTIALS) {
      await this.generateToken();
    }

    switch (this.authType) {
      case AUTH_TYPES.PASSWORD:
        authHeader = `Bearer ${this.oAuthTokens.accessToken}`;
        break;

      case AUTH_TYPES.API_KEY:
        authHeader = `${this.apiKey}`;
        break;

      case AUTH_TYPES.JWT:
        authHeader = `Jwt ${this.jwt.jwtToken}`;
        break;

      case AUTH_TYPES.CLIENT_CREDENTIALS:
        authHeader = `Bearer ${this.oAuthTokens.accessToken}`;
        break;

      default:
        throw new Error('invalid auth type');
    }

    return authHeader;
  };
}

module.exports = {
  Authentication
};

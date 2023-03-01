const qs = require('qs');
const { HttpRequest, requestMethods } = require('./request-handler');
const { AUTH_API } = require('./su-apis');

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
    this.authType = 'oauth2';
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

    const queryStrings = qs.stringify({
      grant_type: 'password',
      username: this.oAuth2.username,
      password: this.oAuth2.password
    });

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
    if (!this.authType) {
      if (this.oAuth2) {
        await this.generateToken();
      }
    }

    switch (this.authType) {
      case 'oauth2':
        authHeader = `Bearer ${this.oAuthTokens.accessToken}`;
        break;

      case 'apiKey':
        authHeader = `ApiKey ${this.apiKey.apiToken}`;
        break;

      case 'jwt':
        authHeader = `Jwt ${this.jwt.jwtToken}`;
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

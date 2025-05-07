exports.DEFAULT_TIMEOUT = 60000;

exports.AUTH_TYPES = {
  API_KEY: 'apiKey',
  PASSWORD: 'password',
  CLIENT_CREDENTIALS: 'clientCredentials',
  JWT: 'jwt'
};

exports.ANALYTICS_INTERNAL_USERS = {
  TRUE: 'true',
  FALSE: 'false',
  ALL: 'all',
  INTERNAL: 'internal',
  EXTERNAL: 'external',
  EXTERNAL_ONLY: 'externalOnly'
};

exports.GPT_REQUEST_TYPE = {
  GPT: 'GPT',
  SEARCH_GPT: 'SEARCH_GPT',
};

exports.GPT_REQUEST_SORT = {
  SCORE: '_score',
  POST_TIME: '_post_time'
};
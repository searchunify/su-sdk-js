const Joi = require('joi');
const { AUTH_TYPES } = require('./../utils/constants');

const initialize = Joi.object({
  instance: Joi.string().uri().trim().required(),
  timeout: Joi.number().min(30000).max(180000),
  apiKey: Joi.string(),
  authType: Joi.string().valid(
    AUTH_TYPES.API_KEY,
    AUTH_TYPES.PASSWORD,
    AUTH_TYPES.CLIENT_CREDENTIALS
  ).default('oauth2'),
  oauth2: Joi.when('authType', {
    switch: [
      {
        is: AUTH_TYPES.API_KEY,
        then: Joi.forbidden()
      },
      {
        is: AUTH_TYPES.CLIENT_CREDENTIALS,
        then: Joi.object({
          clientId: Joi.string().required(),
          clientSecret: Joi.string().required(),
          username: Joi.forbidden(),
          password: Joi.forbidden()
        }).required()
      },
      {
        is: Joi.valid(AUTH_TYPES.PASSWORD, Joi.valid(null)), // fallback to oauth2-like behavior
        then: Joi.object({
          clientId: Joi.string().required(),
          clientSecret: Joi.string().required(),
          username: Joi.string().required(),
          password: Joi.string().required()
        }).required()
      }
    ],
    otherwise: Joi.object({
      clientId: Joi.string().required(),
      clientSecret: Joi.string().required(),
      username: Joi.string().required(),
      password: Joi.string().required()
    }).required()
  })
}).or(AUTH_TYPES.API_KEY, 'oauth2');

const validateTimeout = Joi.object().keys({
  timeout: Joi.number().min(30000).max(180000)
});

module.exports = {
  initialize,
  validateTimeout
};

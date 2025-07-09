const Joi = require('joi');
const { GPT_REQUEST_TYPE, GPT_REQUEST_SORT } = require('../utils/constants');

const searchValidation = Joi.object().keys({
  uid: Joi.string().uuid().trim().required(),
  searchString: Joi.string().trim().allow(null, '').required()
}).unknown(true);

const gptResultValidation = Joi.object().keys({
  searchClientId: Joi.string().uuid().trim(),
  searchString: Joi.string().trim().required(),
  requestType: Joi.string().required().valid(...Object.values(GPT_REQUEST_TYPE)),
  pageNo: Joi.when('requestType', {
    is: GPT_REQUEST_TYPE.SEARCH_GPT,
    then: Joi.number().required(),
    otherwise: Joi.number().optional(),
  }),
  context: Joi.when('requestType', {
    is: GPT_REQUEST_TYPE.GPT,
    then: Joi.string().required(),
    otherwise: Joi.string().optional(),
  }),
  articles: Joi.when('requestType', {
    is: GPT_REQUEST_TYPE.GPT,
    then: Joi.array().items(
      Joi.object({
        title: Joi.string().optional(),
        href: Joi.string().optional(),
      })
    ).required(),
    otherwise: Joi.array().items(
      Joi.object({
        title: Joi.string().optional(),
        href: Joi.string().optional(),
      })
    ).optional(),
  }),
  from: Joi.when('requestType', {
    is: GPT_REQUEST_TYPE.GPT,
    then: Joi.number().required(),
    otherwise: Joi.number().optional(),
  }),
  resultsPerPage: Joi.when('requestType', {
    is: GPT_REQUEST_TYPE.SEARCH_GPT,
    then: Joi.number().required(),
    otherwise: Joi.number().optional(),
  }),
  sortby: Joi.string().trim().required().valid(...Object.values(GPT_REQUEST_SORT)),
  aggregations: Joi.array().items(
    Joi.object({
      type: Joi.string().required(),
      filter: Joi.string().required(),
    })
  ).optional(),
  exactPhrase: Joi.string().trim().optional(),
  withOneOrMore: Joi.string().trim().optional(),
  withoutTheWords: Joi.string().trim().optional(),
  email: Joi.string().allow('').email().optional(),
  userType: Joi.string().trim().optional().allow(''),
  profileId: Joi.string().trim().optional().allow(''),
  contactId: Joi.string().trim().optional().allow(''),
  accountId: Joi.string().trim().optional().allow(''),
  userId: Joi.string().trim().optional().allow(''),
  language: Joi.string().trim().optional(),
  pagingAggregation: Joi.object({
    keyword: Joi.string().optional(),
    field: Joi.string().trim().optional(),
  }).optional(),
  boardsArr: Joi.string().trim().optional().allow(''),
  roles: Joi.string().trim().optional().allow(''),
  getScore: Joi.number().optional(),
  redisEnable: Joi.number().optional(),
  redisCachingTime: Joi.number().optional(),
  indexEnabled: Joi.boolean().optional(),
  searchWithoutHosted: Joi.boolean().optional(),
  encrypt: Joi.boolean().optional(),
  referer: Joi.string().trim().optional().allow(''),
  mergeSources: Joi.boolean().optional(),
  apiVersion: Joi.boolean().optional(),
  orderBy: Joi.string().optional(),
  fields: Joi.array().optional(),
});

module.exports = {
  searchValidation,
  gptResultValidation
};

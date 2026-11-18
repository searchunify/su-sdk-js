const Joi = require('joi');

/* Bodies of the read-only custom reports routes. Only the fields below are sent: anything else is
   refused, and no tenant id is ever part of a body (the instance takes the tenant from the
   credential). */

const DAY = /^\d{4}-\d{2}-\d{2}$/;
const USER_TYPES = ['all', 'internal', 'external', 'externalOnly'];
const MAX_PAGE_SIZE = 500; // the analytics API's own limit
const MAX_SEARCH_CLIENTS = 100;

const day = Joi.string().pattern(DAY)
  .messages({ 'string.pattern.base': '{{#label}} must be a YYYY-MM-DD date' });
const reportId = Joi.string().trim().min(1).max(200)
  .required();
const searchClients = Joi.array().items(Joi.string().trim().min(1).max(128))
  .max(MAX_SEARCH_CLIENTS);

exports.runReport = Joi.object({
  reportId,
  from: day.required(),
  to: day.required(),
  page: Joi.number().integer().min(1),
  pageSize: Joi.number().integer().min(1).max(MAX_PAGE_SIZE),
  sortBy: Joi.string().max(200),
  sortDir: Joi.string().valid('asc', 'desc'),
  internalUser: Joi.string().valid(...USER_TYPES),
  searchClients,
  custom: Joi.object().pattern(Joi.string(), Joi.any()),
  search: Joi.object().pattern(Joi.string(), Joi.alternatives().try(Joi.string(), Joi.number())),
  includeTotals: Joi.boolean()
}).custom((value, helpers) => (value.from > value.to
  ? helpers.message('from must be on or before to')
  : value));

exports.getReportFilterOptions = Joi.object({
  reportId,
  name: Joi.string().trim().min(1).max(200)
    .required(),
  search: Joi.string().allow('').max(100),
  limit: Joi.number().integer().min(1).max(200),
  from: day,
  to: day,
  searchClients,
  internalUser: Joi.string().valid(...USER_TYPES)
});

exports.USER_TYPES = USER_TYPES;
exports.MAX_PAGE_SIZE = MAX_PAGE_SIZE;

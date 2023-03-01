const Joi = require('joi');

const encodePathUri = (result, encodeParams) => {
  Object.keys(encodeParams).forEach((items) => {
    if (encodeParams[items] === true) {
      result.value[items] = encodeURIComponent(encodeURIComponent(result.value[items]));
    }
  });

  return result;
};

const validate = (schema, request, encodeUri = false) => {
  let result = Joi.compile(schema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(request);

  if (encodeUri) {
    result = encodePathUri(result, {
      documentId: true // Boolean values: if encode needed.
    });
  }
  if (result.error) {
    const errorMessage = result.error.details.map((details) => details.message).join(', ');

    throw new Error(errorMessage);
  }
};


module.exports = {
  validate
};

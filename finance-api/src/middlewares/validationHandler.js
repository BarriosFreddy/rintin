const boom = require("@hapi/boom");
const joi = require("@hapi/joi");

function validationHandler(schema, check = "body") {
  return function (req, res, next) {
    const { error } = schema.validate(req[check]);
    error ? next(boom.badRequest(error)) : next();
  };
}

module.exports = validationHandler;

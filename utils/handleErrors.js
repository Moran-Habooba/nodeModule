// const chalk = require("chalk");

const handleError = (res, status, message = "") => {
  console.log(message);
  return res.status(status).send(message);
};

const handleJoiError = async (error) => {
  const joiError = new Error(error.details[0].message);
  return handleBadRequest("Joi", joiError);
};

const handleBadRequest = async (validator, error) => {
  const errorMessage = `${validator} Error: ${error.message}`;
  error.message = errorMessage;
  error.status = error.status || 400;
  return Promise.reject(error);
};
exports.handleError = handleError;
exports.handleBadRequest = handleBadRequest;
exports.handleJoiError = handleJoiError;

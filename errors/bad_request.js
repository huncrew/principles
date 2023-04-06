// const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom_error');

class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;

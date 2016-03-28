'use strict';

module.exports = function NotFound(message, errorCode) {

  Error.captureStackTrace(this, this.constructor);

  this.name = this.constructor.name;
  this.message = message || 'The requested resource couldn\'t be found';
  this.statusCode = 404;
  this.errorCode = errorCode || 404;
};

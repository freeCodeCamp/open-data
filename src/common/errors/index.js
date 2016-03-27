'use strict';

module.exports = function NotFound(message, errorCode) {

  Error.captureStackTrace(this, this.constructor);

  this.name = this.constructor.name;
  this.message = message || 'The requested resource couldn\'t be found';
  this.statusCode = 404;
  this.errorCode = errorCode || 404;
};

// module.exports[404] = function pageNotFound(req, res) {
//   var viewFilePath = '404';
//   var statusCode = 404;
//   var result = {
//     status: statusCode
//   };

//   res.status(result.status);
//   res.json(result, result.status);
// };

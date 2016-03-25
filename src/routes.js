'use strict';

var errors = require('./common/errors');
var path = require('path');

module.exports = function(app) {

  // Insert routes below
  app.use('/v1', require('./v1'));
    
  // All undefined asset or api routes should return a 404
  app.route('/:url(v1)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};

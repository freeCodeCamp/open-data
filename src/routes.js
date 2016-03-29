'use strict';

var path = require('path');

module.exports = function(app) {

  // Define versioning as top root
  app.use('/v1', require('./v1'));

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};

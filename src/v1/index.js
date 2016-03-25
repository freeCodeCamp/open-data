'use strict';

var express = require('express');
var controller = require('./controller');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// Get a list of users
router.get('/users', function(req, res, next) {
  res.send('A list of users is requested');
  next();
});
// define the about route
router.get('/user/:username', function(req, res, next) {
  res.send('Requested user '+req.params.username);
  next();
});

module.exports = router;
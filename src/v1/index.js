'use strict';

var express = require('express');
var controller = require('./controller');
var router = express.Router();

// Get a list of users
router.get('/users', controller.index);
// define the single user route
router.get('/user/:username', controller.show);

module.exports = router;

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if ( process.env.NODE_ENV === 'development') {
  require('dotenv').load();
}

const express = require('express');
const mongoose = require('mongoose');
const compression = require('compression');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const path = require('path');
const cors = require('cors');

const mongoUrl = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL;
// Connect to database
mongoose.connect(mongoUrl);
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
  }
);

const appRoot = path.normalize(__dirname + '/..');

// Setup Express
var app = express();

app.use(cors());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('appPath', path.join(appRoot, 'public'));
app.use(errorHandler()); 

// Setup server
var server = require('http').createServer(app);
require('./routes')(app);

// Start server
server.listen(process.env.PORT, process.env.HOST, function () {
  console.log('Express server listening on %d, in %s mode', process.env.PORT , app.get('env'));
});

// Expose app
exports = module.exports = app;

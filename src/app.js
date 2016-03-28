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
const path = require('path');
const cors = require('cors');

const mongoUrl = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL;
// Connect to database
mongoose.connect(mongoUrl);
mongoose.connection.on('error', function(err) {
	throw Error('MongoDB connection error: ' + err);
});

const appRoot = path.normalize(path.join(__dirname, '/..'));

// Setup Express
var app = express();

app.use(cors());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('appPath', path.join(appRoot, 'public'));
// Setup server
var server = require('http').createServer(app);

require('./routes')(app);

// Basic error handling
app.use(function(err, req, res) {
   res.json({status: 500, message: err.message});
});

// Start server
server.listen(process.env.PORT, process.env.HOST, function() {
  console.log('Express server listening on %d, in %s mode'
		, process.env.PORT, app.get('env'));
});

// Expose app
exports = module.exports = app;

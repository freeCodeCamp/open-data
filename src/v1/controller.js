'use strict';

var User = require('./user');
var Usage = require('./usage');

// Get list of fccusers
exports.index = function(req, res) {
	checkApiKey(req, res, function(err, data ) {
		if (err) {}
	})
    return res.status(200).send('<h1>Not Implemented</h1>');
};


var checkApiKey = function(req, res, cb) {
	if (!req.params.query) {
		cb( new Error('You need to provide a query string'));
		return;
	}

	if (!req.params.query.key) {
		cb(new Error('No API key is provided'));
		return;
	}

	Usage.findOne({'apikey': req.params.query.key})
		.exec(function(err, data) {

			if (err) {cb(err); return; }
			console.log(data);
			if (data === null) {cb(new Error('API key does not exist')); return;}

			if (data.blocked) {
				cb(new Error('This account is blocked, you probably know why.'));
				return;
			}

			cb(null, data);

		});
};

var updateUsage = function(req, res, cb) {
   			var now = new Date();
			if (!data.lastUsed) {
				data.countHour = 0;
				data.countDay = 0;
				data.countMonth = 0;
				data.countYear = 0;
				data.countEver = 0;
			}
			else {
				var timePassed = now.getTime() - data.lastUsed.getTime();
				if (timePassed > oneHour) {data.countHour = 0;}
				if (timePassed > oneDay) {data.countDay = 0;}
				if (timePassed > oneMonth) {data.countMonth = 0;}
				if (timePassed > oneYear) {data.countYear = 0;}
			}
			data.countHour++;
			data.countDay++;
			data.countMonth++;
			data.countYear++;
			data.countEver++;
			data.lastUsed = now;
			data.save( function(err) {
				if (err) { cb(err); }
				return;
			});

};
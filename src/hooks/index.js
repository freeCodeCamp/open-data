'use strict';

const apikey = require('../services/apikey/apikey-model');
const oneHour = 60 * 60 * 1000;
const oneDay = 24 * oneHour;
const oneMonth = 30 * oneDay;
const oneYear = 365 * oneDay;

exports.checkApiKey = function(hook, cb) {
	if (hook.params.provider !== 'rest') {
		cb(new Error('Only REST API is allowed'));
		return;
	}

	if (!hook.params.query) {
		cb( new Error('You need to provide a query string'));
		return;
	}

	if (!hook.params.query.apikey) {
		cb(new Error('No API key is provided'));
		return;
	}

	apikey.findOne({'apikey': hook.params.query.apikey})
		.exec(function(err, data) {

			if (err) {cb(err); return; }
			console.log(data);
			if (data === null) {cb(new Error('API key does not exist')); return;}

			if (data.blocked) {
				cb(new Error('This account is blocked, you probably know why.'));
				return;
			}

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
		});
};

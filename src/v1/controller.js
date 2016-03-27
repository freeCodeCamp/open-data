'use strict';

var User = require('./user');
var ApiUser = require('./api-user');
var Usage = require('./usage');

const queryItems = [
	'username', 'algorithmsRecent', 'algorithmsTotal', 'challengesRecent',
	'challengesTotal', 'helpsRecent', 'helpsTotal', 'hikesRecent', 'hikesTotal',
	'otherRecent', 'otherTotal', 'pointsRecent', 'pointsTotal', 'projectsRecent',
	'projectsTotal'];

const oneHour = 60 * 60 * 1000;
const oneDay = 24 * oneHour;
const oneMonth = 30 * oneDay;
const oneYear = 365 * oneDay;

// Get list of fccusers
exports.index = function(req, res, next) {

	validateApiKey(req, res, function(err, usage ) {
		if (err) {
			next(err);
			return;
		} else {
			var criterium = parseCriterium(req);
			var limit = Math.min(req.query.limit || 50, 100);
			var skip = req.query.skip || 0;
			var sortCrit = parseSort(req.query.sort);
			var details = (req.query.details || 'false').toLowerCase() === 'true';
			ApiUser.find(criterium)
				.skip(skip)
				.sort(sortCrit)
				.limit(limit)
				.exec(function(err, apiusers) {
					if (err) { next(err); return;}
					var results = apiusers.map(function(user) {
						return mapApiUser(user, details);
					});
					updateUsage(usage, function(err) {
						if (err) { next(err); return;}
						res.json({status: 200, results: results});
					});

				});
		}
	});
};

exports.show = function(req, res, next) {
	validateApiKey(req, res, function(err, usage ) {
		if (err) {
			next(err);
			return;
		}	else {
			var details = (req.query.details || 'false').toLowerCase() === 'true';
			User.findOne({username: req.params.username}, function(err, user) {
				if (err) { next(err); return;}
				var result = mapUser(user, details);
				updateUsage(usage, function(err) {
					if (err) { next(err); return;}
					res.json({status: 200, user: result});
				});
			});

		}
	});
};

var parseSort = function(sortcrit) {
	var sortList = {};
	if (!sortcrit) { return sortList; }

	var options = sortcrit.split(',');

	options.forEach(function(option) {
		queryItems.forEach(function(item) {
			if (option === item || option === '-' + item) {
				sortList[item] = (option === '-' + item ? -1 : 1);
			}
		});
	});
	console.log(sortList);
	return sortList;
};

var parseCriterium = function(req) {
	var critList = [];
	queryItems.forEach(function(item) {
		if (req.query[item]) {
			var crit = {};
			var value = req.query[item];
			var val = value.toLowerCase();
			if (value.substring(0, 1) === '>' || value.substring(0, 1) === '<') {
				val = {};
				var arg = (value.substring(0, 1) === '<' ? '$lt' : '$gt');
				val[arg] = value.substring(1).toLowerCase();
			}
			crit[item] = val;
			critList.push(crit);
		}
	});
	var result = {};
	if (critList.length > 0) {
		result['$and'] = critList;
	}
	return result;
};

var mapApiUser = function(apiuser, details) {
	var usr = {};
	usr.username = apiuser.username;
	usr.picture = apiuser.picture;
	usr.algorithmsRecent = apiuser.algorithmsRecent;
	usr.algorithmsTotal = apiuser.algorithmsTotal;
	usr.challengesRecent = apiuser.challengesRecent;
	usr.challengesTotal = apiuser.challengesTotal;
	usr.helpsRecent = apiuser.helpsRecent;
	usr.helpsTotal = apiuser.helpsTotal;
	usr.hikesRecent = apiuser.hikesRecent;
	usr.hikesTotal = apiuser.hikesTotal;
	usr.otherRecent = apiuser.otherRecent;
	usr.otherTotal = apiuser.otherTotal;
	usr.pointsRecent = apiuser.pointsRecent;
	usr.pointsTotal = apiuser.pointsTotal;
	usr.projectsRecent = apiuser.projectsRecent;
	usr.projectsTotal = apiuser.projectsTotal;
	usr.lastUpdate = apiuser.lastUpdate;
	if (details) {
		usr.startDate = apiuser.challenges[0].completed;
		usr.stopDate = apiuser.challenges[apiuser.challenges.length - 1].completed;
		usr.isFrontEndCert = apiuser.isFrontEndCert;
		usr.isBackEndCert = apiuser.isBackEndCert;
		usr.isFullStackCert = apiuser.isFullStackCert;
		usr.challenges = apiuser.challenges;
	}
	return usr;
};

var mapUser = function(user, details) {
	var usr = {};
	usr.username = user.username;
	usr.picture = user.picture;
	usr.joinedFccOn = user.progressTimestamps[0].completed;
	usr.isGithubCool = user.isGithubCool;
	usr.joinedGithubOn = user.joinedGithubOn;
	usr.githubURL = user.githubURL;
	usr.name = user.name;
	usr.location = user.location;
	usr.timezone = user.timezone;
	usr.currentStreak = user.currentStreak;
	usr.longestStreak = user.longestStreak;
	usr.currentChallenge = user.currentChallenge;
	usr.isFrontEndCert = user.isFrontEndCert;
	usr.isBackEndCert = user.isBackEndCert;
	usr.isFullStackCert = user.isFullStackCert;
	console.log('Mapped user', usr);
	if (details) {
		usr.challengeMap = user.challengeMap;
		usr.progressTimestamps = user.progressTimestamps;
	}
	return usr;
};

var validateApiKey = function(req, res, next) {
	if (!req.query) {
		next(new Error('You need to provide a query string'));
		return;
	}

	if (!req.query.key) {
		next(new Error('No API key is provided'));
		return;
	}

	Usage.findOne({ 'apiKey': req.query.key }).exec( function(err, data) {
		if (err) { next(err); return;}
		if (data === null) {
			next(new Error('API key does not exist') );
			return;
		}

		if (data.blocked) {
			next(new Error('This account is blocked, you probably know why.'));
			return;
		}

		next(null, data);

	});
};

var updateUsage = function(usage, next) {

   var now = new Date();
	if (!usage.lastUsed) {
		usage.countHour = 0;
		usage.countDay = 0;
		usage.countMonth = 0;
		usage.countYear = 0;
		usage.countEver = 0;
	} else {
		var timePassed = now.getTime() - usage.lastUsed.getTime();
		if (timePassed > oneHour) {usage.countHour = 0;}
		if (timePassed > oneDay) {usage.countDay = 0;}
		if (timePassed > oneMonth) {usage.countMonth = 0;}
		if (timePassed > oneYear) {usage.countYear = 0;}
	}
	usage.countHour++;
	usage.countDay++;
	usage.countMonth++;
	usage.countYear++;
	usage.countEver++;
	usage.lastUsed = now;
	usage.save( function(err) {
		if (err) { next(err); }
		next();
	});
};

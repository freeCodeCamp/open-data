'use strict';

// Add / remove test users to test the API

// const app = require('../../../src/app');
const ApiUser = require('../../../src/v1/api-user');

exports.testusers = [
	{ username: 'testuser1',
		pointsRecent: 117, pointsTotal: 323,
		helpsRecent: 0, helpsTotal: 3,
		challengesRecent: 17, challengesTotal: 45,
		algorithmsRecent: 4, algorithmsTotal: 18,
		projectsRecent: 1, projectsTotal: 8,
		otherRecent: -1, otherTotal: 13
	},
	{ username: 'testuser2',
		pointsRecent: 53, pointsTotal: 223,
		helpsRecent: 2, helpsTotal: 83,
		challengesRecent: 7, challengesTotal: 35,
		algorithmsRecent: 17, algorithmsTotal: 28,
		projectsRecent: 0, projectsTotal: 7,
		otherRecent: -1, otherTotal: 25
	},
	{ username: 'atestuser3',
		pointsRecent: 117, pointsTotal: 523,
		helpsRecent: 120, helpsTotal: 173,
		challengesRecent: 18, challengesTotal: 45,
		algorithmsRecent: 14, algorithmsTotal: 78,
		projectsRecent: 8, projectsTotal: 26,
		otherRecent: -1, otherTotal: 13
	},
	{ username: 'ztestuser4',
		pointsRecent: 117, pointsTotal: 39,
		helpsRecent: 0, helpsTotal: 1,
		challengesRecent: 1, challengesTotal: 19,
		algorithmsRecent: 1, algorithmsTotal: 8,
		projectsRecent: 0, projectsTotal: 2,
		otherRecent: -1, otherTotal: 2
	}
];

exports.insertTestUsers = function() {
	this.testusers.forEach(function(user) {
		createApiUser(user);
	});
};

exports.removeTestUsers = function() {
	this.testusers.forEach(function(user) {
		removeApiUser(user);
	});
};

var createApiUser = function(userdata ) {

	var user = new ApiUser();
	user.username = userdata.username;
	user.pointsRecent = userdata.pointsRecent;
	user.pointsTotal = userdata.pointsTotal;
	user.helpsRecent = userdata.helpsRecent;
	user.helpsTotal = userdata.helpsTotal;
	user.challengesRecent = userdata.challengesRecent;
	user.challengesTotal = userdata.challengesTotal;
	user.algorithmsRecent = userdata.algorithmsRecent;
	user.algorithmsTotal = userdata.algorithmsTotal;
	user.projectsRecent = userdata.projectsRecent;
	user.projectsTotal = userdata.projectsTotal;
	user.otherRecent = userdata.otherRecent;
	user.otherTotal = userdata.otherTotal;
	user.challenges = [{
		'type': 'C',
		'name': 'Trigger Click Events with jQuery',
		'completed': 1454141493450
	}];
	user.save(function(err, results) {
		if (err) {return err;}
		return results;
	});
};

var removeApiUser = function(userdata ) {

	ApiUser.remove({username: userdata.username}, function(err) {
		if (err) {return err;}
		return 'OK';
	});
};

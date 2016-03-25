'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const camperSchema = new Schema(	{
		username: { type: String, required: true },
		avatar: String,
		registerDate: Date,
		location: String,

		pointsTotal: Number,
		projectsTotal: Number,
		algorithmsTotal: Number,
		challengesTotal: Number,
		helpsTotal: Number,

		pointsRecent: Number,
		projectsRecent: Number,
		algorithmsRecent: Number,
		challengesRecent: Number,
		helpsRecent: Number,

		completed: [{
				title: String,
				firstSubmitted: Number,
				lastSubmitted: Number,
				type: String,
				solutionUrl: String,
				solutionCode: String
			}]
});

const camperModel = mongoose.model('camper', camperSchema);

module.exports = camperModel;

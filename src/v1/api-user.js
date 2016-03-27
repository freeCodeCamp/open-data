'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ApiUserSchema = new Schema({
  username: String,
  picture: String,
  // enriched:
  pointsTotal: Number,
  pointsRecent: Number,
  projectsTotal: Number,
  projectsRecent: Number,
  challengesTotal: Number,
  challengesRecent: Number,
  algorithmsTotal: Number,
  algorithmsRecent: Number,
  hikesTotal: Number,
  hikesRecent: Number,
  helpsTotal: Number,
  helpsRecent: Number,
  otherTotal: Number,
  otherRecent: Number,
  lastUpdate: Number,
  challenges: [Schema.Types.Mixed]
});

module.exports = mongoose.model('ApiUser', ApiUserSchema);

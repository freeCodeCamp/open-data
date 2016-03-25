'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  picture: String,
  email: String,
  progressTimestamps: [{
        timestamp: String,
        completedChallenge: String
    }],
  isBanned: Boolean,
  isCheater: Boolean,
  isGithubCool: Boolean,
  currentStreak: Number,
  longestStreak: Number,
  sendMonthlyEmail: Boolean,
  sendNotificationEmail: Boolean,
  sendQuincyEmail: Boolean,
  isLocked: Boolean,
  isHonest: Boolean,
  isBackEndCert: Boolean,
  isFullStackCert: Boolean,
  isChallengeMapMigrated: Boolean,
  emailVerified: Boolean,
  challengeMap: Schema.Types.Mixed,
  // enriched:
  pointsTotal: Number,
  pointsRecent: Number,
  projectsTotal: Number,
  projectsRecent: Number,
  challengesTotal: Number,
  challengesRecent: Number,
  algorithmsTotal: Number,
  algorithmsRecent: Number,
  helpsTotal: Number,
  helpsRecent: Number,
  lastUpdate: Date
});

module.exports = mongoose.model('User', UserSchema);
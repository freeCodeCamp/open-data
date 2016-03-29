'use strict';


var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  picture: String,
  // Private data (not used in the API)
  email: String,
  bio: String,
  isBanned: Boolean,
  isCheater: Boolean,
  isLocked: Boolean,
  isHonest: Boolean,
  emailVerified: Boolean,
  // Public/Progress data (available in single user requests)
  isGithubCool: Boolean,
  name: String,
  githubURL: String,
  location: String,
  timezone: String,
  joinedGithubOn: Date,
  currentStreak: Number,
  longestStreak: Number,
  sendMonthlyEmail: Boolean,
  sendNotificationEmail: Boolean,
  sendQuincyEmail: Boolean,
  currentChallenge: Schema.Types.Mixed,
  // Progress data, used by API user list
  isFrontEndCert: Boolean,
  isBackEndCert: Boolean,
  isFullStackCert: Boolean,
  isChallengeMapMigrated: Boolean,
  progressTimestamps: [Schema.Types.Mixed],
  challengeMap: Schema.Types.Mixed,
  completedChallenges: [Schema.Types.Mixed]
 });

module.exports = mongoose.model('User', UserSchema);

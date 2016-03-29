
// This script adds summary data to the users collection.
// Precondition: FCC users must be loaded into the users collection
// Note: docs that already contain a property pointsTotal are assumed
//       to be converted before and will be skipped

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if ( process.env.NODE_ENV === 'development') {
  require('dotenv').load();
}

const User = require('../src/v1/user');
const ApiUser = require('../src/v1/api-user');
const mongoose = require('mongoose');

const rundate = new Date();
const threshold30days = rundate.getTime() - (30 * 24 * 60 * 60 * 1000);

// Connect to database
const mongoUrl = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL;
mongoose.connect(mongoUrl);

var added = 0;
var updated = 0;
var removed = 0;
var errors = 0;

var processing = 0;

var promise = User.find()
  .exec(function(err, users) {

    if (err) { errors++; return err;}

    users.forEach(function(user) {

   //   console.log('Processing user', user.username);
      processing++;
      ApiUser.findOne({username: user.username}, function(err, apiUser) {
        if (err) { errors++; processing--; return err; }

        if (apiUser &&
            (user.isLocked || user.isCheater)) {
          apiUser.remove();
          removed++;
          processing--;
          return 'removed';
        }
        var newUser = (!apiUser);
        if (newUser) {
          apiUser = initApiUser(user);
        }

        apiUser = getTotalsAndHelps(user, apiUser);
        if (user.isChallengeMapMigrated) {
          apiUser = getDataFromChallengeMap(user, apiUser);
        } else {
          apiUser = getDataFromCompletedChallenges(user, apiUser);
        }
        if (apiUser.challenges.length > 0) {
          apiUser.challenges.sort(function(a, b) {
            return a.completed - b.completed;
          });
        }

        apiUser.save(function(err) {
          if (err) { errors++; processing--; return err; }
     //     console.log('Saved ApiUser', apiUser.username);
          processing--;
          if (newUser) {
            added++;
          } else {
            updated++;
          }
          return 'OK1';
        });

        return 'OK2';
      });
    });

    return 'OK3';
});

var waitForCompletion = function() {
  if (processing > 0) {
    setTimeout(waitForCompletion, 1000);
  } else {
    console.log('Added:', added,
              '\nUpdated:', updated,
              '\nRemoved:', removed,
              '\nErrors:', errors);
    mongoose.connection.close();
  }
};

promise.then(function() {
  setTimeout(waitForCompletion, 100);
}, function(err) {
  throw Error('Oops, something went wrong: ' + err);
});

var initApiUser = function(user) {

  var apiUser = new ApiUser();
  apiUser.username = user.username;
  apiUser.picture = user.picture;
  apiUser.lastUpdate = new Date().getTime();
  apiUser.pointsTotal = 0;
  apiUser.projectsTotal = 0;
  apiUser.challengesTotal = 0;
  apiUser.algorithmsTotal = 0;
  apiUser.hikesTotal = 0;
  apiUser.helpsTotal = 0;
  apiUser.pointsRecent = 0;
  apiUser.projectsRecent = 0;
  apiUser.challengesRecent = 0;
  apiUser.algorithmsRecent = 0;
  apiUser.hikesRecent = 0;
  apiUser.helpsRecent = 0;
  apiUser.challenges = [];

  return apiUser;
};

var getTotalsAndHelps = function(user, apiUser) {

  if (user.progressTimestamps) {
    var recentTimestamps = user.progressTimestamps.filter(function(elm) {
        return elm.timestamp >= threshold30days;
    });
    var recentHelps = user.progressTimestamps.filter(function(elm) {
        return (elm.timestamp >= threshold30days &&
                elm.hasOwnProperty('giver'));
    });
    var totalHelps = user.progressTimestamps.filter(function(elm) {
        return (elm.hasOwnProperty('giver'));
    });

      // Start with the easy data
      apiUser.pointsTotal = user.progressTimestamps.length;
      apiUser.pointsRecent = recentTimestamps.length;
      apiUser.helpsTotal = totalHelps.length;
      apiUser.helpsRecent = recentHelps.length;
  }
  return apiUser;
};

var getDataFromChallengeMap = function(user, apiUser) {

  var countChallengeTotal = [0, 0, 0, 0, 0, 0, 0, 0];
  var countChallengeRecent = [0, 0, 0, 0, 0, 0, 0, 0];
  apiUser.challenges = [];

  for (var challenge in user.challengeMap) {

    // Ignore challenges without a name
    if (user.challengeMap.hasOwnProperty(challenge) &&
        user.challengeMap[challenge].name) {

        var idx = (user.challengeMap[challenge].challengeType ?
                   user.challengeMap[challenge].challengeType : 0);

        countChallengeTotal[idx]++;

        if (user.challengeMap[challenge].completedDate >= threshold30days) {
          countChallengeRecent[idx]++;
        }

        var chall = {};
        chall.name = user.challengeMap[challenge].name;
        chall.completed = user.challengeMap[challenge].completedDate;
        switch (idx) {
           case 3 :
           case 4 : chall.type = 'P'; break; // 3/4=Project
           case 5 : chall.type = 'A'; break; // 5=Algorithm
           case 6 : chall.type = 'H'; break; // 6=Hike
           default: chall.type = 'C';        // others = Challenge
        }
        if (user.challengeMap[challenge].lastUpdated) {
          chall.lastUpdated = user.challengeMap[challenge].lastUpdated;
        }
        if (user.challengeMap[challenge].completedWith) {
          chall.with = user.challengeMap[challenge].completedWith;
        }
        if (chall.type === 'P') {
          if (user.challengeMap[challenge].solution &&
              user.challengeMap[challenge].solution.toLowerCase()
                .startsWith('http')) {
            chall.solution = user.challengeMap[challenge].solution;
          }
          if (user.challengeMap[challenge].githubLink &&
              user.challengeMap[challenge].githubLink.toLowerCase()
                .startsWith('http')) {
            chall.githubLink = user.challengeMap[challenge].githubLink;
          }
          if (!user.challengeMap[challenge].verified) {
            chall.verified = user.challengeMap[challenge].verified;
          }
        }
        apiUser.challenges.push(chall);
      }
  }
  return processCounts(apiUser, countChallengeTotal, countChallengeRecent);
};

var getDataFromCompletedChallenges = function(user, apiUser) {

  var countChallengeTotal = [0, 0, 0, 0, 0, 0, 0, 0];
  var countChallengeRecent = [0, 0, 0, 0, 0, 0, 0, 0];

  user.completedChallenges.forEach(function(challenge) {
    var idx = (challenge.challengeType ? challenge.challengeType : 0);
    countChallengeTotal[idx]++;
    if (challenge.completedDate >= threshold30days) {
        countChallengeRecent[idx]++;
    }
  });

  return processCounts(apiUser, countChallengeTotal, countChallengeRecent);
};

var processCounts = function(apiUser, countChallengeTotal,
                              countChallengeRecent) {

  // Challenge types:
  // 0 : Challenge
  // 1 : Challenge (former Waypoint)
  // 2 : Challenge ????
  // 3 : Projects (former Zipline)
  // 4 : Projects (former Basejump)
  // 5 : algorithm (former Bonfire or Waypoint)
  // 6 : Hike (video)
  // 7 : Challenge (no solution)
  // 8 :
  // 9 :

  apiUser.projectsTotal = countChallengeTotal[3] + countChallengeTotal[4];
  apiUser.challengesTotal = countChallengeTotal[0] + countChallengeTotal[1] +
                            countChallengeTotal[2] + countChallengeTotal[7];
  apiUser.algorithmsTotal = countChallengeTotal[5];
  apiUser.hikesTotal = countChallengeTotal[6];
  apiUser.otherTotal = apiUser.pointsTotal - apiUser.projectsTotal -
                       apiUser.challengesTotal - apiUser.algorithmsTotal -
                       apiUser.hikesTotal - apiUser.helpsTotal;
  apiUser.projectsRecent = countChallengeRecent[3] + countChallengeRecent[4];
  apiUser.challengesRecent = countChallengeRecent[0] + countChallengeRecent[1] +
                             countChallengeRecent[2] + countChallengeRecent[7];
  apiUser.algorithmsRecent = countChallengeRecent[5];
  apiUser.hikesRecent = countChallengeRecent[6];
  apiUser.otherRecent = apiUser.pointsRecent - apiUser.projectsRecent -
                        apiUser.challengesRecent - apiUser.algorithmsRecent -
                        apiUser.hikesRecent - apiUser.helpsRecent;

  return apiUser;
};

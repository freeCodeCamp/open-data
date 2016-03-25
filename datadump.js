// This script creates a datadump output file from teh camper collection

const env = require('./config/default.json');
const fs = require('fs');

const Camper = require('./services/camper/camper-model');
const mongoose = require('mongoose');

const rundate = new Date();
const rundateFmt = rundate.getFullYear() + '-' + rundate.getMonth() + '-' +
                 rundate.getDate() + 'T' + rundate.getHours() + ':' +
                 rundate.getMinutes() + ':' + rundate.getSeconds();
const threshold30days = rundate.getTime() - (30 * 24 * 60 * 60 * 1000);
const header = '"userid","lastUpdate","points","pointsRecent",' +
              '"algoritms","algoritmsRecent",' +
              '"projects","projectsRecent","challenges","challengesRecent"';

const fileName = 'fccoutput' + rundateFmt + '.csv';
const counter = 0;

fs.open(env.filepath + fileName, 'a', function(err, fd) {

		if (err) {throw err;}

		fs.writeSync(fd, header + '\n');

    var db = mongoose.connect(env.mongodb);

    processUsers(db, fd, function() {
          db.connection.close();
          fs.closeSync(fd);
          console.log('File:' + fileName + ' Records exported:', counter);
    });

});

var processUsers = function(db, fd, callback ) {

  Camper.find().exec(function(err, doc) {

    if (err) { throw err;}

    if (doc !== null) {
        counter++;
        fs.write(fd, processUser(doc) + '\n');
      } else {
         callback();
      }
   } );
};

var processUser = function(doc) {
  var rec = [];

  var recentTimestamps = doc.progressTimestamps.filter(function(elm) {
								return elm.timestamp >= threshold30days;
					});

  // Start with the easy data
  rec.push( '"'+doc.username+'"' ); // 1: username
  rec.push( '"'+rundateFmt+'"' ); // 3: lastUpdate
  rec.push(doc.progressTimestamps.length); // 4: points
  rec.push(recentTimestamps.length);  // 5: pointsRecent  

  var countChallenge       = [0,0,0,0,0,0,0,0];
  var countChallengeRecent = [0,0,0,0,0,0,0,0];

  doc.completedChallenges
  		.forEach(function(challenge) {
  			// Bonfires and Waypoints are both challengeType 5: Split up on challenge name starting with Bonfire 
  			var idx = (challenge.name.indexOf('Bonfire') === 0 ? 2 : challenge.challengeType);
  			countChallenge[idx]++;		
 	 		if (challenge.completedDate >= threshold30days) {
 	 				countChallengeRecent[idx]++;
 	 		}
  		});

  	// 6: bonfires
  	// 7: bonfiresRecent
  	// 8: ziplines
  	// 9: ziplinesRecent
  	// 10: basejumps
  	// 11: basejumpsRecent
  	// 12: waypoints
  	// 13: waypointsRecent

  	for (var i=2; i<=5;i++) {
  		rec.push(countChallenge[i] );
  		rec.push(countChallengeRecent[i] );
  	}

  return rec.join(',');

}

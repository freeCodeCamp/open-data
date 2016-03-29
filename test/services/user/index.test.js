'use strict';

const test = require('tape');
const seed = require('./seed');
const app = require('../../../src/app');
const request = require('supertest');
const apiKeyGood = 'testok123';
const Usage = require('../../../src/v1/usage');
const endpoint = '/v1/users?key=' + apiKeyGood + '&';

// Insert test data for the API key
var testApiKey1 = new Usage();
testApiKey1.apiKey = apiKeyGood;
testApiKey1.blocked = false;
testApiKey1.save();

seed.insertTestUsers();

test.onFinish(function() {
  seed.removeTestUsers();
  Usage.remove({apiKey: apiKeyGood}, function(err) {
    if (err) {return err;}
    return 'OK';
  });
});

// Define the server
var send = function(path, callback) {
  request(app)
    .get(path)
    .expect(200)
    .expect('Content-Type', /json/)
    .end(callback);
};

test('Select all test users', function(assert) {
  send(endpoint + 'otherRecent=-1', function(err, res) {

      var expectedStatus = 200;
      var expectedCount = 4;
      var actual = res.body;

     // console.log(actualPage);
      assert.error(err, 'No error');
      assert.ok(typeof actual === 'object', 'An object is returned');
      assert.same(actual.status, expectedStatus, 'Status 200 is expected');
      assert.same(actual.results.length, expectedCount, '4 test users are returned');
      assert.end();
    });
});

test('Test sort, skip and limit', function(assert) {
  send(endpoint + 'otherRecent=-1&sort=username&skip=1&limit=1', function(err, res) {

      var expectedStatus = 200;
      var expectedCount = 1;
      var expectedUsername = seed.testusers[0].username;
      var actual = res.body;

     // console.log(actualPage);
      assert.error(err, 'No error');
      assert.ok(typeof actual === 'object', 'An object is returned');
      assert.same(actual.status, expectedStatus, 'Status 200 is expected');
      assert.same(actual.results.length, expectedCount, 'Just 1 user is returned');
      assert.same(actual.results[0].username, expectedUsername, '2nd test user is returned');
      assert.end();
    });

});

test('Test filter on pointsTotal > 223', function(assert) {
  send(endpoint + 'otherRecent=-1&pointsTotal=>223', function(err, res) {

      var expectedStatus = 200;
      var expectedCount = 2;
      var actual = res.body;

     // console.log(actualPage);
      assert.error(err, 'No error');
      assert.same(actual.status, expectedStatus, 'Status 200 is expected');
      assert.same(actual.results.length, expectedCount, '2 user is returned');
      assert.end();
    });

});

test('Test filter on pointsTotal = 223', function(assert) {
  send(endpoint + 'otherRecent=-1&pointsTotal=223', function(err, res) {

      var expectedStatus = 200;
      var expectedCount = 1;
      var actual = res.body;

     // console.log(actualPage);
      assert.error(err, 'No error');
      assert.same(actual.status, expectedStatus, 'Status 200 is expected');
      assert.same(actual.results.length, expectedCount, '1 user is returned');
      assert.end();
    });

});

test('Test filter on pointsTotal < 223', function(assert) {
  send(endpoint + 'otherRecent=-1&pointsTotal=<223', function(err, res) {

      var expectedStatus = 200;
      var expectedCount = 1;
      var actual = res.body;

     // console.log(actualPage);
      assert.error(err, 'No error');
      assert.same(actual.status, expectedStatus, 'Status 200 is expected');
      assert.same(actual.results.length, expectedCount, '1 user is returned');
      assert.end();
    });

});

test('Test filter on 3 criteria and details', function(assert) {
  send(endpoint + 'otherRecent=-1&challengesTotal=>19&' +
		'pointsRecent=117&algorithmsRecent=<14&details=true', function(err, res) {

      var expectedStatus = 200;
      var expectedCount = 1;
      var actual = res.body;

     // console.log(actualPage);
      assert.error(err, 'No error');
      assert.same(actual.status, expectedStatus, 'Status 200 is expected');
      assert.same(actual.results.length, expectedCount, '1 user is returned');
      assert.ok(actual.results[0].challenges, 'User has challenge details');
      assert.end();
    });

});

'use strict';

const Usage = require('../src/v1/usage');
const test = require('tape');
const request = require('supertest');
const app = require('../src/app.js');
const apiKeyGood = 'testok123';
const apiKeyBlocked = 'testfail999';

// Insert test data for the API key
var testApiKey1 = new Usage();
testApiKey1.apiKey = apiKeyGood;
testApiKey1.blocked = false;
testApiKey1.save();

var testApiKey2 = new Usage();
testApiKey2.apiKey = apiKeyBlocked;
testApiKey2.blocked = true;
testApiKey2.save();

test.onFinish(function() {
  Usage.remove({apiKey: apiKeyGood}, function(err) {
    if (err) {return err;}
    return 'OK';
  });
  Usage.remove({apiKey: apiKeyBlocked}, function(err) {
    if (err) {return err;}
    return 'OK';
  });
});

// Define the server
var send = function(path, status, content, callback) {
  request(app)
    .get(path)
    .expect(status)
    .expect('Content-Type', content)
    .end(callback);
};

test('Request for index page', function(assert) {
  send('/', 200, /html/, function(err, res) {

      var expectedText = 'FreeCodeCamp Public API';
      var actualPage = res.text;

     // console.log(actualPage);
      assert.error(err, 'No error');
      assert.ok(typeof actualPage === 'string');
      assert.ok(actualPage.indexOf(expectedText) > 0, 'Check index page title');
      assert.end();
    });

});

test('Request non existing page returns index page', function(assert) {
  send('/not-exist', 200, /html/, function(err, res) {

      var expectedText = 'FreeCodeCamp Public API';
      var actualPage = res.text;

     // console.log(actualPage);
      assert.error(err, 'No error');
      assert.ok(typeof actualPage === 'string');
      assert.ok(actualPage.indexOf(expectedText) > 0, 'Check index page title');
      assert.end();
    });

});

test('Validate API key usage', function(assert) {
  send('/v1/users?skip=5', 200, /json/, function(err, res) {

      var expectedStatus = 500;
      var expectedMessage = 'API key is required';
      var actual = res.body;

      assert.error(err, 'No error');
      assert.same(actual.status, expectedStatus, 'Status 500 is expected');
      assert.same(actual.message, expectedMessage, 'API key is missing as expected');
      assert.end();

  });

});

test('API key must exist', function(assert) {
  send('/v1/users?key=xxx', 200, /json/, function(err, res) {

      var expectedStatus = 500;
      var expectedMessage = 'API key does not exist';
      var actual = res.body;

      assert.error(err, 'No error');
      assert.same(actual.status, expectedStatus, 'Status 500 is expected');
      assert.same(actual.message, expectedMessage, 'Non existing API key');
      assert.end();
  });
});

test('API key may not be blocked', function(assert) {
    send('/v1/users?key=' + apiKeyBlocked, 200, /json/, function(err, res) {

        var expectedStatus = 500;
        var expectedMessage = 'This account is blocked, you probably know why.';
        var actual = res.body;

        assert.error(err, 'No error');
        assert.same(actual.status, expectedStatus, 'Status 500 is expected');
        assert.same(actual.message, expectedMessage, 'A blocked API key was used');
        assert.end();
    });
});

test('Valid API key returns response', function(assert) {
    send('/v1/users?key=' + apiKeyGood, 200, /json/, function(err, res) {

        var expectedStatus = 200;
        var actual = res.body;

        assert.error(err, 'No error');
        assert.same(actual.status, expectedStatus, 'Status 200 is expected');
        assert.end();
    });
});

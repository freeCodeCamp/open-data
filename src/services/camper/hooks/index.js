'use strict';

const globalHooks = require('../../../hooks');
const errors = require('feathers-errors');

// const hooks = require('feathers-hooks');

exports.before = {
  all(hook) {
    console.log('Before hook');
    globalHooks.checkApiKey(hook, handleError);
    console.log('After hook', hook.params);
  },
  find: [],
  get: []
};

exports.after = {
  all: [],
  find: [],
  get: []
};

function handleError(err) {
  console.log(err);
  const error = new errors.GeneralError(err);
}

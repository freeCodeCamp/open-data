'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;

exports.before = {
  all: [],
  find: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.requireAuth()
  ],
  get: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.requireAuth()
  ],
  create: [
    auth.hashPassword()
  ],
  update: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.requireAuth()
  ],
  patch: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.requireAuth()
  ],
  remove: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.requireAuth()
  ]
};

exports.after = {
  all: [hooks.remove('password')],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};

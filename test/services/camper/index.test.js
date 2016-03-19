'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('camper service', () => {
  it('registered the campers service', () => {
    assert.ok(app.service('campers'));
  });
});

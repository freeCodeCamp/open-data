'use strict';

const service = require('feathers-mongoose');
const camper = require('./camper-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: camper,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/campers', service(options));

  // Get our initialize service to that we can bind hooks
  const camperService = app.service('/campers');

  // Set up our before hooks
  camperService.before(hooks.before);

  // Set up our after hooks
  camperService.after(hooks.after);
};

'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UsageSchema = new Schema({
  apiKey: { type: String, required: true, unique: true },
  blocked: Boolean,
  lastUsed: Date,
  countEver: Number,
  countYear: Number,
  countMonth: Number,
  countDay: Number,
  countHour: Number,
  owner: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'User'
  }
});

module.exports = mongoose.model('Usage', UsageSchema);

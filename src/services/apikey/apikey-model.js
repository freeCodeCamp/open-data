'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const apikeySchema = new Schema(	{
	apikey: { type: String, required: true, unique: true },
	owner: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'user'
	},
	createDate: Date,
	lastUsed: { type: Date},
	countHour: Number,
	countDay: Number,
	countMonth: Number,
	countYear: Number,
	countEver: Number,
	blocked: Boolean
});

const apikeyModel = mongoose.model('apikey', apikeySchema);

module.exports = apikeyModel;

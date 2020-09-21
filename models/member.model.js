const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
	//_id auto generated
	username            : {
		type     : String,
		required : true,
		unique   : true,
		trim     : true,
		min      : 3
	},
	firstname           : String,
	familyname          : String,
	age                 : { type: Number, min: 18, max: 100 },
	accountcreationdate : { type: Date, default: Date.now() },
	accountupdatedate   : { type: Date, default: Date.now() },
	dob                 : {
		date  : { type: Number, min: 1, max: 31, required: true },
		month : { type: Number, min: 1, max: 12, required: true },
		year  : { type: Number, required: true }
	},
	password            : { type: String, required: true }
});

//model
const Member = mongoose.model('Member', memberSchema);

module.exports = Member;

const mongoose = require("mongoose");

const { Schema } = mongoose;

const Province = new Schema({
	name: {
		type: String,
		required: true,
	},
	code: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("Province", Province, "provinces");

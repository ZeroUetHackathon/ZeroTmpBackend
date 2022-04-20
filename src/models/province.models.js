const mongoose = require("mongoose");

const { Schema } = mongoose;

const Province = new Schema({
	name: {
		type: String,
		required: true,
	},
});

// eslint-disable-next-line
module.exports = new mongoose.model("Province", Province, "provinces");

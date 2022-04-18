const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Province = new Schema({
	name: {
		type: String,
		required: true,
	},
});

module.exports = new mongoose.model("Province", Province, "provinces");

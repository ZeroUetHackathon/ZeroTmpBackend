const mongoose = require("mongoose");

const { Schema } = mongoose;

const Wiki = new Schema({
	wiki: String,
	validated: {
		type: String,
		default: false,
	},
	attachments: [String],
});

// eslint-disable-next-line
module.exports = new mongoose.model("Wiki", Wiki, "wikis");

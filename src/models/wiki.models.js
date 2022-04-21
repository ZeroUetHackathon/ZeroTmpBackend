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

module.exports = mongoose.model("Wiki", Wiki, "wikis");

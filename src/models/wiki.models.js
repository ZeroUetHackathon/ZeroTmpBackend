const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Wiki = new Schema({
	wiki: String,
	validated: {
		type: String,
		default: false,
	},
	attachments: [String],
});

module.exports = new mongoose.model("Wiki", Wiki, "wikis");

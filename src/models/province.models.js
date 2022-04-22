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
	wikiId: {
		type: Schema.Types.ObjectId,
		ref: "Wiki",
	},
});

module.exports = mongoose.model("Province", Province, "provinces");

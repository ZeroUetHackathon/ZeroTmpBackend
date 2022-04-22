const mongoose = require("mongoose");

const { Schema } = mongoose;

const Rating = new Schema({
	scores: [Number],
	feedbackId: {
		type: Schema.Types.ObjectId,
		ref: "Feedback",
	},
});

module.exports = mongoose.model("Rating", Rating, "ratings");

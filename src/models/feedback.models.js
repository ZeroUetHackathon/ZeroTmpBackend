const mongoose = require("mongoose");

const { Schema } = mongoose;

const Feedback = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		productId: {
			type: Schema.Types.ObjectId,
			ref: "Product",
		},
		comment: String,
		attachments: [String],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Feedback", Feedback, "feedbacks");

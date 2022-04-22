const mongoose = require("mongoose");

const { Schema } = mongoose;

const Sale = new Schema({
	productId: {
		type: Schema.Types.ObjectId,
		ref: "Product",
	},
	mode: {
		type: String,
		default: "normal",
	},
	price: Number,
	sold: Number,
	discount: Number,
	numbers: Number,
	attachments: [String],
});

module.exports = mongoose.model("Sale", Sale, "sales");

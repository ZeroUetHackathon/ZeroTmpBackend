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
});

module.exports = mongoose.model("Sale", Sale, "sales");

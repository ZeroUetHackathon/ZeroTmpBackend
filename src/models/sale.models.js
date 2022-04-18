const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

module.exports = new mongoose.model("Sale", Sale, "sales");

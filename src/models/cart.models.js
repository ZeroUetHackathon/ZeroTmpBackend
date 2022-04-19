const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Cart = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	saleId: {
		type: Schema.Types.ObjectId,
		ref: "Sale",
	},
	numbers: {
		type: Number,
		default: 0,
	},
	location: {
		type: String,
		required: true,
	},
});

module.exports = new mongoose.model("Cart", Cart, "carts");

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
});

module.exports = new mongoose.model("Cart", Cart, "carts");

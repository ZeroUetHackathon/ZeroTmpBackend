const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Product = new Schema({
	name: {
		type: String,
		required: true,
	},
	wiki: String,
	attachments: [String],
});

module.exports = new mongoose.model("Product", Product, "products");

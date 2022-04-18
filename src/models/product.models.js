const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Product = new Schema({
	name: {
		type: String,
		required: true,
	},
	wikiId: {
		type: Schema.Types.ObjectId,
		ref: "Wiki",
	},
	provinceId: {
		type: Schema.Types.ObjectId,
		ref: "Province",
	},
});

module.exports = new mongoose.model("Product", Product, "products");

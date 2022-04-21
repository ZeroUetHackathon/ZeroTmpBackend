const mongoose = require("mongoose");

const { Schema } = mongoose;

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
	shortDescription: String,
});

module.exports = mongoose.model("Product", Product, "products");

const mongoose = require("mongoose");

const { Schema } = mongoose;

const Product = new Schema({
	name: {
		type: String,
		required: true,
		text: true,
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
	expire: Date,
	category: String,
	shopId: {
		type: Schema.Types.ObjectId,
		ref: "Shop",
	},
});

module.exports = mongoose.model("Product", Product, "products");

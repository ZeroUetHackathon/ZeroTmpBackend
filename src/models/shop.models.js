const mongoose = require("mongoose");
const {
	validator: { isEmail },
} = require("#utils");

const { Schema } = mongoose;

const Shop = new Schema({
	shopName: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: String,
		required: true,
		unique: true,
	},
	address: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		validate(value) {
			if (!isEmail(value)) {
				throw new Error("Invalid email");
			}
		},
	},
});

module.exports = mongoose.model("Shop", Shop, "shops");

const mongoose = require("mongoose");
const {
	encrypt,
	validator: { isEmail },
} = require("#utils");

const { Schema } = mongoose;

const User = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true,
		lowercase: true,
		index: true,
		validate(value) {
			if (!isEmail(value)) {
				throw new Error("Invalid email");
			}
		},
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minlength: 8,
		validate(value) {
			if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
				throw new Error(
					"Password must contain at least one letter and one number"
				);
			}
		},
	},
	role: {
		type: Number,
		// role guest = 3
		default: 3,
	},
	isVerified: {
		type: Boolean,
		default: false,
	},
});

/**
 * Check if password matches the user's password
 * @param {string} password
 * @return {Promise<boolean>}
 */
User.methods.isPasswordMatch = async function (password) {
	return encrypt.verify(this.password, password);
};

// Hash password before save if user's password was changed
User.pre("save", async function (next) {
	if (this.isModified("password")) {
		this.password = await encrypt.hash(this.password);
	}
	return next();
});

module.exports = mongoose.model("User", User, "users");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
	role: {
		type: String,
		default: "guest",
	},
});

module.exports = new mongoose.model("User", User, "users");

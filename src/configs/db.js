const mongoose = require("mongoose");
const config = require("./config");

const databaseConnect = async () => {
	try {
		await mongoose.connect(config.DBUri);
		console.log("connected to mongodb");
	} catch (err) {
		console.log(err);
	}
};

module.exports = databaseConnect;

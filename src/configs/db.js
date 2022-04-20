const mongoose = require("mongoose");
const config = require("./config");

const databaseConnect = async () => {
	try {
		await mongoose.connect(config.DBUri);
		// eslint-disable-next-line
		console.log("connected to mongodb");
	} catch (err) {
		// eslint-disable-next-line
		console.log(err);
	}
};

module.exports = databaseConnect;

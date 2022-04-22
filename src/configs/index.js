/* eslint-disable global-require */
module.exports = {
	config: require("./config"),
	paseto: require("./paseto"),
	snowflake: require("./snowflake"),
	msgpackr: require("./msgpackr"),
	db: require("./db"),
	ua: require("./ua"),
	Redis: require("./redis"),
	models: {
		roles: require("./models/roles"),
	},
};

const config = require("./config");
const paseto = require("./paseto");
const snowflake = require("./snowflake");
const msgpackr = require("./msgpackr");
const db = require("./db");
const ua = require("./ua");
const Redis = require("./redis");
const models = {
	roles: require("./models/roles"),
};

module.exports = {
	config,
	paseto,
	snowflake,
	msgpackr,
	db,
	ua,
	Redis,
	models,
};

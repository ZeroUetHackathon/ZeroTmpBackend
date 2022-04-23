const authHandler = require("./auth");
const fastifyMsgpackr = require("./fastifyMsgpackr");
const errorHandler = require("./errorHandler");
const notFoundHandler = require("./notFoundHandler");

module.exports = {
	authHandler,
	fastifyMsgpackr,
	errorHandler,
	notFoundHandler,
};

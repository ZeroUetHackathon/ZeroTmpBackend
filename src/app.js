const fastify = require("fastify");
const cookie = require("fastify-cookie");
const cors = require("fastify-cors");
const { errorHandler } = require("#middlewares");

const { db, config } = require("#configs");

const { users, auth, products } = require(`#routes`)[config.API_VERSION];

const app = (opts = {}) => {
	const app = fastify(opts);

	/* -------------------- register cors ------------------- */
	app.register(cors, {
		origin: true,
		credentials: true,
	});

	/* ------------------- register cookie ------------------ */
	app.register(cookie);

	/* ----------------- connect to database ---------------- */
	db();

	/* -------------------- setup routes -------------------- */
	app.register(users, { prefix: `/${config.API_VERSION}` });
	app.register(auth, { prefix: `/${config.API_VERSION}` });
	app.register(products, { prefix: `/${config.API_VERSION}` });

	/* -------------------- error handler ------------------- */
	app.setErrorHandler(errorHandler);

	return app;
};

module.exports = app;

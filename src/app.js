const fastify = require("fastify");
const cookie = require("fastify-cookie");
const cors = require("fastify-cors");
const { errorHandler, notFoundHandler } = require("#middlewares");

const { db, config, Redis } = require("#configs");

const { users, auth, products } = require(`#routes`)[config.API_VERSION];

const { fastifyMsgpackr } = require("#middlewares");

const appInit = (opts = {}) => {
	const app = fastify(opts);

	const redis = new Redis(6379);
	global.redis = redis;

	/* -------------------- register msgpack ------------------- */
	// Send and receive msgpacked message if the frontend request it
	app.register(fastifyMsgpackr);

	/* -------------------- register cors ------------------- */
	app.register(cors, {
		origin: true,
		credentials: true,
	});

	/* ------------------- register cookie ------------------ */
	app.register(cookie, {
		secret: config.COOKIE.SECRET,
		parseOptions: {},
	});

	/* ----------------- connect to database ---------------- */
	db();

	/* -------------------- setup routes -------------------- */
	app.register(users, { prefix: `/${config.API_VERSION}/users` });
	app.register(auth, { prefix: `/${config.API_VERSION}/auth` });
	app.register(products, { prefix: `/${config.API_VERSION}/products` });

	/* --------------- not found route handler -------------- */
	app.setNotFoundHandler(notFoundHandler);
	/* -------------------- error handler ------------------- */
	app.setErrorHandler(errorHandler);

	return app;
};

module.exports = appInit;

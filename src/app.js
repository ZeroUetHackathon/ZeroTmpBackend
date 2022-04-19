const fastify = require("fastify");
const cookie = require("fastify-cookie");
const cors = require("fastify-cors");

const { db, config } = require("#configs");

const { users, auth } = require(`#routes`)[config.API_VERSION];

const { fastifyMsgpackr } = require('#middlewares');

const app = (opts = {}) => {
	const app = fastify(opts);

	/* -------------------- register msgpack ------------------- */
	// Send and receive msgpacked message if the frontend request it
	fastify.register(fastifyMsgpackr())

	/* -------------------- register cors ------------------- */
	app.register(cors, {
		origin: true,
		credentials: true,
	});

	/* ------------------- register cookie ------------------ */
	app.register(cookie, {
		secret: config.COOKIE.SECRET,
		parseOptions: {}
	});

	/* ----------------- connect to database ---------------- */
	db();

	/* -------------------- setup routes -------------------- */
	app.register(users, { prefix: `/${config.API_VERSION}/users` });
	app.register(auth, { prefix: `/${config.API_VERSION}/auth` });

	return app;
};

module.exports = app;

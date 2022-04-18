const fastify = require("fastify");
const cookie = require("fastify-cookie");
const cors = require("fastify-cors");
const dotenv = require("dotenv");
const path = require("path");

const { db, config } = require("#configs");

const { users, auth } = require(`#routes`)[config.API_VERSION];

const app = (opts = {}) => {
	const app = fastify(opts);
	dotenv.config({ path: path.join(__dirname, "../.env") });

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
	app.register(users, { prefix: `/${config.API_VERSION}/users` });
	app.register(auth, { prefix: `/${config.API_VERSION}/auth` });

	return app;
};

module.exports = app;

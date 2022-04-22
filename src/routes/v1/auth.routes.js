const { authController } = require("#controllers");
const { authHandler } = require("#middlewares");

const auth = (fastify, _opts, done) => {
	fastify.get(
		"/",
		{ preHandler: authHandler.verifyToken },
		authController.auth
	);
	fastify.post("/login", authController.login);
	fastify.post("/register", authController.register);
	fastify.post(
		"/logout",
		{ preHandler: authHandler.verifyToken },
		authController.logout
	);

	done();
};

module.exports = auth;

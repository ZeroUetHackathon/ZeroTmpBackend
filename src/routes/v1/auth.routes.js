const { authController } = require("#controllers");
const { authHandler } = require("#middlewares");

const auth = (fastify, _opts, done) => {
	fastify.get(
		"/auth",
		{ preHandler: authHandler.verifyToken },
		authController.auth
	);
	fastify.post("/auth/login", authController.login);
	fastify.post("/auth/register", authController.register);
	fastify.get(
		"/auth/logout",
		{ preHandler: authHandler.verifyToken },
		authController.logout
	);

	done();
};

module.exports = auth;

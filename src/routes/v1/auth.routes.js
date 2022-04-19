const { authController } = require('#controllers');

const auth = (fastify, _opts, done) => {
	fastify.get("/auth", authController.auth);
	fastify.post("/auth/login", authController.login);
	fastify.post("/auth/register", authController.register);
	fastify.get("/auth/logout", authController.logout);

	done();
};

module.exports = auth;

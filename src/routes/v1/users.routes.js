const { authHandler } = require("#middlewares");
const { usersController } = require("#controllers");

const users = (fastify, _opts, next) => {
	fastify.get(
		"/auth",
		{ preHandler: authHandler.verifyToken },
		usersController.getUsers
	);
	fastify.post(
		"/auth",
		{ preHandler: authHandler.verifyToken },
		usersController.createUser
	);
	next();
};

module.exports = users;

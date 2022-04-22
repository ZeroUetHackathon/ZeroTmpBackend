const { authHandler } = require("#middlewares");
const { usersController } = require("#controllers");

const users = (fastify, _opts, next) => {
	// get all users
	fastify.get(
		"/",
		{ preHandler: authHandler.verifyToken },
		usersController.getUsers
	);
	// create user
	fastify.post(
		"/",
		{ preHandler: authHandler.verifyToken },
		usersController.createUser
	);
	// get user by id
	fastify.get(
		"/:userId",
		{ preHandler: authHandler.verifyToken },
		usersController.getUser
	);
	// update user
	fastify.patch(
		"/:userId",
		{ preHandler: authHandler.verifyToken },
		usersController.updateUser
	);
	// delete user
	fastify.delete(
		"/:userId",
		{ preHandler: authHandler.verifyToken },
		usersController.deleteUser
	);
	next();
};

module.exports = users;

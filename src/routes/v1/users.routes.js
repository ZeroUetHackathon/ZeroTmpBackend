const { auth } = require("#middlewares");
const { usersController } = require("#controllers");

const users = (fastify, _opts, next) => {
	fastify.route({
		method: "GET",
		url: "/",
		preHandler: auth.verifyToken,
		handler: usersController.getUsers,
	});

	fastify.route({
		method: "POST",
		url: "/",
		preHandler: auth.verifyToken,
		handler: usersController.createUser,
	});
	next();
};

module.exports = users;

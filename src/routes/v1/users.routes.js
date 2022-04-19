const { auth } = require('#middlewares');
const { userController } = require('#controllers');

const users = (fastify, _opts, next) => {
	fastify.route({
		method: "GET",
		url: "/",
		preHandler: auth.verifyToken,
		handler: userController.getUsers,
	});

	fastify.route({
		method: "POST",
		url: "/",
		preHandler: auth.verifyToken,
		handler: userController.createUser,
	});
	next();
};

module.exports = users;

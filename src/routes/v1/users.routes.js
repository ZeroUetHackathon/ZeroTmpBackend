const users = (fastify, _opts, next) => {
	fastify.get("/users", async (request, reply) => {
		setTimeout(() => {
			reply.send({
				message: "Hello World",
			});
		}, 3000);
		await reply;
	});

	next();
};

module.exports = users;

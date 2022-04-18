const users = (fastify, _opts, next) => {
	fastify.get("/users", async (req, res) => {
		return res.send({
			message: "Hello World",
		});
	});

	next();
};

module.exports = users;

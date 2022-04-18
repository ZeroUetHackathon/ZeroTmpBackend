const auth = (fastify, _opts, next) => {
	fastify.get("/auth", async (req, res) => {
		return res.send({
			message: "Hello World",
		});
	});

	next();
};

module.exports = auth;

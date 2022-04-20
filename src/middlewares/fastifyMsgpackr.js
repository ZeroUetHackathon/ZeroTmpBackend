const fp = require("fastify-plugin");
const { msgpackr } = require("#configs");

/**
 *
 * @param {FastifyInstance} fastify
 * @param {*} options
 * @param {*} next
 */
function fastifyMsgpackr(fastify, options, next) {
	// eslint-disable-next-line
	fastify.register(require("fastify-accepts-serializer"), {
		serializers: [
			{
				regex: /^application\/x-msgpack$/,
				serializer: (body) => Buffer.from(msgpackr.pack(body)),
			},
		],
		default: "application/json",
	});

	fastify.addContentTypeParser(
		"application/x-msgpack",
		{
			parseAs: "buffer",
		},
		(req, body, done) => {
			try {
				const res = msgpackr.unpack(body);
				return res;
			} catch (err) {
				done(err);
			}
		}
	);

	next();
}

module.exports = fp(fastifyMsgpackr, {
	fastify: "3.x",
	name: "fastify-msgpackr",
});

const { wikisController } = require("#controllers");
const upload = require("multer")({ des: "./uploads" });

const wikis = (fastify, opts, next) => {
	fastify.route({
		method: "PATCH",
		url: "/wiki/id",
		preHandler: [upload.array("files")],
		handler: wikisController.editWiki,
	});
	next();
};

module.exports = wikis;

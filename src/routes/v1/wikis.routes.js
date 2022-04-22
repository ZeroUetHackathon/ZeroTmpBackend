const { wikisController } = require("#controllers");

const wikis = (fastify, opts, next) => {
	fastify.patch("/wiki/id", wikisController.editWiki);
	next();
};

module.exports = wikis;

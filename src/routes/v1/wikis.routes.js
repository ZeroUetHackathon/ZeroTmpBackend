const { wikisController } = require("#controllers");

const wikis = (fastify, opts, next) => {
	fastify.put("/wiki/id", wikisController.editWiki);
	next();
};

module.exports = wikis;

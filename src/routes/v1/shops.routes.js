const { shopsController } = require("#controllers");

const products = (fastify, opts, next) => {
	fastify.get("/products", shopsController.getAllProducts);
	fastify.put("/", shopsController.updateShop);
	next();
};

module.exports = products;

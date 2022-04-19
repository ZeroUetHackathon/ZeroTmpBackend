const { productsController } = require("#controllers");

const products = (fastify, opts, next) => {
	fastify.post("/", productsController.addProduct);
	fastify.get("/:provinceId", productsController.getProductsByProvince);
	fastify.get("/:productId", productsController.getProductById);
	fastify.put("/:productId", productsController.editProduct);
	fastify.delete("/:productId", productsController.deleteProduct);
	next();
};

module.exports = products;

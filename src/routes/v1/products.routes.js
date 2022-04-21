const { productsController } = require("#controllers");

const products = (fastify, opts, next) => {
	fastify.get("/product/:productId", productsController.getProductById);
	fastify.put("/product/:productId", productsController.editProduct);
	fastify.delete("/product/:productId", productsController.deleteProduct);
	fastify.get("/:provinceId", productsController.getProductsByProvince);
	fastify.post("/:provinceId", productsController.addProduct);
	next();
};

module.exports = products;

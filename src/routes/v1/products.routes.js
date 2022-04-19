const { productsController } = require("#controllers");

const products = (fastify, opts, next) => {
	fastify.get(
		"/products/:provinceId",
		productsController.getProductsByProvince
	);
	fastify.get("/product/:productId", productsController.getProductById);
	fastify.put("/product/:productId", productsController.editProduct);
	fastify.delete("/product/:productId", productsController.deleteProduct);
	fastify.post("/product", productsController.addProduct);
	next();
};

module.exports = products;

const { productController } = require("#controllers");

const products = (fastify, opts, next) => {
	fastify.get("/products/:provinceId", productController.getProductsByProvince);
	fastify.get("/product/:productId", productController.getProductById);
	fastify.put("/product/:productId", productController.editProduct);
	fastify.delete("/product/:productId", productController.deleteProduct);
	fastify.post("/product", productController.addProduct);
	next();
};

module.exports = products;

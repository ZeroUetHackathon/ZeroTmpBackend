const { productsController } = require("#controllers");
const upload = require("multer")({ des: "./uploads" });

const products = (fastify, opts, next) => {
	fastify.get(
		"/products/:provinceId",
		productsController.getProductsByProvince
	);
	fastify.get("/product/:productId", productsController.getProductById);
	fastify.route({
		method: "PUT",
		url: "/product/:productId",
		preHandler: [upload.array("files")],
		handler: productsController.editProduct,
	});
	fastify.delete("/product/:productId", productsController.deleteProduct);
	fastify.route({
		method: "PUT",
		url: "/product",
		preHandler: [upload.array("files")],
		handler: productsController.addProduct,
	});
	next();
};

module.exports = products;

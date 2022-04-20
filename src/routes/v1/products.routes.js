const upload = require("multer")({ des: "./uploads" });
const { productsController } = require("#controllers");

const products = (fastify, opts, next) => {
	fastify.get("/product/:productId", productsController.getProductById);
	fastify.get("/:provinceId", productsController.getProductsByProvince);
	fastify.route({
		method: "PATCH",
		url: "/product/:productId",
		preHandler: [upload.array("files")],
		handler: productsController.editProduct,
	});
	fastify.delete("/product/:productId", productsController.deleteProduct);
	fastify.route({
		method: "POST",
		url: "/product",
		preHandler: [upload.array("files")],
		handler: productsController.addProduct,
	});
	next();
};

module.exports = products;

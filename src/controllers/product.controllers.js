const { Product } = require("#models");
const { ApiError } = require("#utils");
const mongoose = require("mongoose");
const status = require("http-status");

module.exports = {
	getProductsByProvince: async (request, reply) => {
		const products = await Product.aggregate()
			.match({ provinceId: request.params.provinceId })
			.lookup({
				from: "wikis",
				localField: "wikiId",
				foreignField: "_id",
				as: "wiki",
			});
		if (products.length == 0)
			throw new ApiError("Không tìm thấy sản phẩm nào", status.NOT_FOUND);
		return reply.code(status.OK).send({ products });
	},
	getProductById: async (request, reply) => {
		const product = await Product.aggregate()
			.match({ _id: new mongoose.Types.ObjectId(request.params.productId) })
			.lookup({
				from: "wikis",
				localField: "wikiId",
				foreignField: "_id",
				as: "wiki",
			});
		if (product.length == 0)
			throw new ApiError("Không tìm thấy sản phẩm nào", status.NOT_FOUND);
		return reply.code(status.OK).send({ product: product[0] });
	},
	addProduct: async (request, reply) => {
		const product = await Product.create(request.body);
		return reply.code(status.OK).send({ product });
	},
	editProduct: async (request, reply) => {
		const product = await Product.findByIdAndUpdate(
			request.params.productId,
			request.body,
			{ new: true }
		);
		if (!product)
			throw new ApiError("Không tìm thấy sản phẩm nào", status.NOT_FOUND);
		return reply.code(status.OK).send({ product });
	},
	deleteProduct: async (request, reply) => {
		const product = await Product.findByIdAndDelete(request.params.productId);
		if (!product)
			throw new ApiError("Không tìm thấy sản phẩm nào", status.NOT_FOUND);
		return reply.code(status.OK).send({ product });
	},
};

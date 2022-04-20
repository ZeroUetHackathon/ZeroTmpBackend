const { Product, Wiki } = require("#models");
const { ApiError, uploadImage } = require("#utils");
const mongoose = require("mongoose");
const status = require("http-status");

module.exports = {
	getProductsByProvince: async (request, reply) => {
		const products = await Product.aggregate()
			// match provinceId
			.match({ provinceId: request.params.provinceId })
			// lookup to get the wiki
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
			// match _id field
			.match({ _id: new mongoose.Types.ObjectId(request.params.productId) })
			// lookup to get the wiki
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
		const { wiki, ...product } = request.body;
		if (req.files) {
			wiki.attachments = req.files.map((file) => {
				return uploadImage(file.path).secure_url;
			});
		}
		const newWiki = await Wiki.create(wiki);
		product.wikiId = newWiki._id;
		const newProduct = await Product.create(product);
		return reply.code(status.OK).send({ product: newProduct });
	},

	editProduct: async (request, reply) => {
		// use {new: true} to return the updated product
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
		// return the deleted product
		const product = await Product.findByIdAndDelete(request.params.productId);
		if (!product)
			throw new ApiError("Không tìm thấy sản phẩm nào", status.NOT_FOUND);
		return reply.code(status.OK).send({ message: "Xoá sản phẩm thành công" });
	},
};

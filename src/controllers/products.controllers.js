const mongoose = require("mongoose");
const status = require("http-status");
const { Product, Wiki } = require("#models");
const { mongooseService } = require("#services");
const { ApiError, uploadImage, getMdShortDesc } = require("#utils");

module.exports = {
	getProductsByProvince: async (request, reply) => {
		const products = await Product.aggregate([
			// match provinceId
			{
				$match: {
					provinceId: new mongoose.Types.ObjectId(request.params.provinceId),
				},
			},
			...mongooseService.addAttachmentsToWikiPlaceholder,
		]);
		if (products.length === 0)
			throw new ApiError("Không tìm thấy sản phẩm nào", status.NOT_FOUND);
		return reply.code(status.OK).send({ products });
	},

	getProductById: async (request, reply) => {
		const product = await Product.aggregate([
			// match _id field
			{
				$match: {
					_id: new mongoose.Types.ObjectId(request.params.productId),
				},
			},
			...mongooseService.addAttachmentsToWikiPlaceholder,
		]);
		if (product.length === 0)
			throw new ApiError("Không tìm thấy sản phẩm nào", status.NOT_FOUND);
		return reply.code(status.OK).send({ product: product[0] });
	},

	addProduct: async (request, reply) => {
		const wiki = {
			wiki: request.body.wiki,
		};
		const product = {
			name: request.body.name,
			provinceId: request.params.provinceId,
		};
		if (request.body.files) {
			wiki.attachments = await Promise.all(
				request.body.files.map(async (file) => {
					const result = await uploadImage(
						Buffer.from(file.data).toString("base64"),
						file.mimetype
					);
					return result.secure_url;
				})
			);
		}
		const newWiki = await Wiki.create(wiki);
		product.shortDescription = getMdShortDesc(newWiki.wiki);
		product.wikiId = newWiki._id;
		const newProduct = await Product.create(product);
		await newProduct.populate("wikiId provinceId");
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

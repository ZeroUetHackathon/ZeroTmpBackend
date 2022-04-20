const mongoose = require("mongoose");
const status = require("http-status");
const { Product, Wiki } = require("#models");
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
			// lookup to get the wiki
			{
				$lookup: {
					from: "wikis",
					localField: "wikiId",
					foreignField: "_id",
					// split the placeholders into an array
					pipeline: [
						{ $project: { wiki: { $split: ["$wiki", "{}"] }, attachments: 1 } },
					],
					as: "wiki",
				},
			},
			// remove array bracket
			{ $unwind: "$wiki" },
			// add attachments into wiki placeholder {}
			{
				$set: {
					wiki: {
						$map: {
							input: {
								// make an array of indexes of wiki attachments
								$range: [0, { $size: "$wiki.attachments" }],
							},
							// so that we can access to map elements using $$this
							as: "this",
							in: {
								// concat the attachments into placeholders
								$concat: [
									// wiki first
									{ $arrayElemAt: ["$wiki.wiki", "$$this"] },
									// then attachments
									{ $arrayElemAt: ["$wiki.attachments", "$$this"] },
								],
							},
						},
					},
				},
			},
			// unwind map elements
			{ $unwind: "$wiki" },
		]);
		if (products.length === 0)
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
			})
			.unwind("$wiki");
		if (product.length === 0)
			throw new ApiError("Không tìm thấy sản phẩm nào", status.NOT_FOUND);
		return reply.code(status.OK).send({ product: product[0] });
	},

	addProduct: async (request, reply) => {
		const { wiki, ...product } = request.body;
		if (request.files) {
			wiki.attachments = request.files.map((file) => {
				return uploadImage(file.path).secure_url;
			});
		}
		const newWiki = await Wiki.create(wiki);
		product.shortDescription = getMdShortDesc(newWiki.wiki);
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

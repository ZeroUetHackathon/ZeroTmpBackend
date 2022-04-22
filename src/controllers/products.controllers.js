const mongoose = require("mongoose");
const status = require("http-status");
const { Product, Province, Sale } = require("#models");
const { mongooseService } = require("#services");
const { ApiError } = require("#utils");

const getProductsByProvince = async (request, reply) => {
	const products = await Province.aggregate([
		// match provinceId
		{
			$match: {
				code: request.params.provinceCode,
			},
		},
		// lookup products
		{
			$lookup: {
				from: "products",
				localField: "_id",
				foreignField: "provinceId",
				pipeline: [
					// lookup sales
					{
						$lookup: {
							from: "sales",
							localField: "_id",
							foreignField: "productId",
							as: "sale",
						},
					},
					// get the total sold of all sales
					{
						$addFields: {
							totalSold: {
								$reduce: {
									input: "$sale",
									initialValue: 0,
									in: {
										$sum: ["$$this.sold", "$$value"],
									},
								},
							},
						},
					},
					// sort by total sold
					{ $sort: { totalSold: -1 } },
				],
				as: "products",
			},
		},
		...mongooseService.addAttachmentsToWikiPlaceholder,
	]);
	if (products.length === 0)
		throw new ApiError(status.NOT_FOUND, "Product not found");
	return reply.code(status.OK).send({ products });
};

const getProductById = async (request, reply) => {
	const product = await Product.aggregate([
		// match _id field
		{
			$match: {
				_id: new mongoose.Types.ObjectId(request.params.productId),
			},
		},
		{
			$lookup: {
				from: "sales",
				localField: "_id",
				foreignField: "productId",
				as: "sales",
			},
		},
	]);
	if (product.length === 0)
		throw new ApiError(status.NOT_FOUND, "Product not found");
	return reply.code(status.OK).send({ product: product[0] });
};

const addProduct = async (request, reply) => {
	const sales = request.body.sales.map((sale) =>
		Object.assign(sale, { productId: request.body.productId })
	);
	const product = {
		name: request.body.name,
		category: request.body.category,
		expire: request.body.expire,
		provinceId: request.body.provinceId,
	};
	await Product.create(product);
	await Sale.insertMany(sales);
	return reply.code(status.OK).send({ message: "Success!" });
};

const editProduct = async (request, reply) => {
	const product = await Product.findByIdAndUpdate(
		request.params.productId,
		request.body,
		{ new: true }
	);
	if (!product) throw new ApiError(status.NOT_FOUND, "Product not found");
	return reply.code(status.OK).send({ message: "Success!" });
};

const deleteProduct = async (request, reply) => {
	// return the deleted product
	const product = await Product.findByIdAndDelete(request.params.productId);
	if (!product) throw new ApiError(status.NOT_FOUND, "Product not found");
	return reply.code(status.OK).send({ message: "Success!" });
};

const searchProduct = async (request, reply) => {
	const { query } = request.body;
	const products = await Product.aggregate([
		{ $match: { $text: { $search: query } } },
		{ $sort: { score: { $meta: "textScore" } } },
		{ $project: { title: 1, _id: 0 } },
	]);
	if (!products) throw new ApiError(status.NOT_FOUND, "Product not found");
	return reply.code(status.OK).send({ products });
};

module.exports = {
	getProductById,
	getProductsByProvince,
	addProduct,
	editProduct,
	deleteProduct,
	searchProduct,
};

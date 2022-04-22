const mongoose = require("mongoose");
const status = require("http-status");
const { Shop } = require("#models");
const { ApiError } = require("#utils");

const getAllProducts = async (request, reply) => {
	const products = await Shop.aggregate([
		// match shopId
		{
			$match: {
				shopId: new mongoose.Types.ObjectId(request.params.shopId),
			},
		},
		{
			$lookup: {
				from: "products",
				localField: "_id",
				foreignField: "shopId",
				as: "product",
			},
		},
	]);
	if (products.length === 0)
		throw new ApiError(status.NOT_FOUND, "No products found");
	return reply.code(status.OK).send({ products });
};

module.exports = {
	getAllProducts,
};

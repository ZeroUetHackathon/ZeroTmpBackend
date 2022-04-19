const mongoose = require("mongoose");
const status = require("http-status");
const { Cart } = require("#models");
const { ApiError } = require("#utils");

module.exports = {
	addCart: async (request, reply) => {
		const cart = await Cart.create(request.body);
		return reply.code(status.OK).send({ cart });
	},
	editCart: async (request, reply) => {
		// use {new: true} to return the updated cart
		const cart = await Cart.findByIdAndUpdate(
			request.params.cartId,
			request.body,
			{ new: true }
		);
		if (!cart)
			throw new ApiError("Không tìm thấy giỏ hàng nào", status.NOT_FOUND);
		return reply.code(status.OK).send({ cart });
	},
	deleteCart: async (request, reply) => {
		// return the deleted cart
		const cart = await Cart.findByIdAndDelete(request.params.cartId);
		if (!cart)
			throw new ApiError("Không tìm thấy giỏ hàng nào", status.NOT_FOUND);
		return reply.code(status.OK).send({ cart });
	},
	getCartById: async (request, reply) => {
		const cart = await Cart.aggregate()
			.match({ _id: new mongoose.Types.ObjectId(request.params.cartId) })
			.lookup({
				from: "sales",
				localField: "saleId",
				foreignField: "_id",
				as: "sale",
			})
			.lookup({
				from: "users",
				localField: "userId",
				foreignField: "_id",
				as: "user",
			})
			.unwind("$sale")
			.unwind("$user");
		if (cart.length === 0)
			throw new ApiError("Không tìm thấy giỏ hàng nào", status.NOT_FOUND);
		return reply.code(status.OK).send({ cart: cart[0] });
	},
	getAllCartsByUserId: async (request, reply) => {
		const carts = await Cart.aggregate()
			.match({ userId: new mongoose.Types.ObjectId(request.params.userId) })
			.lookup({
				from: "sales",
				localField: "saleId",
				foreignField: "_id",
				as: "sale",
			})
			.lookup({
				from: "users",
				localField: "userId",
				foreignField: "_id",
				as: "user",
			})
			.unwind("$sale")
			.unwind("$user");
		if (carts.length === 0)
			throw new ApiError("Không tìm thấy giỏ hàng nào", status.NOT_FOUND);
		return reply.code(status.OK).send({ carts });
	},
};

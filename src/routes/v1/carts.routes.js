const { cartsController } = require("#controllers");

const carts = (fastify, opts, next) => {
	fastify.get("/carts/:userId", cartsController.getAllCartsByUserId);
	fastify.post("/cart", cartsController.addCart);
	fastify.get("/cart/:cartId", cartsController.getCartById);
	fastify.put("/cart/:cartId", cartsController.editCart);
	fastify.delete("/cart/:cartId", cartsController.deleteCart);
	next();
};

module.exports = carts;
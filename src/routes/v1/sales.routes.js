const { salesController } = require("#controllers");

const sales = (fastify, _opts, next) => {
	fastify.post("/", salesController.addSale);
	fastify.put("/:saleId", salesController.updateSale);
	fastify.delete("/:saleId", salesController.deleteSale);
	next();
};

module.exports = sales;

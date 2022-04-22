const status = require("http-status");
const { Sale, ApiError } = require("#models");
const { uploadImage, deleteImage } = require("#utils");

const addSale = async (request, reply) => {
	const sale = request.body;
	if (request.body.files) {
		sale.attachments = await Promise.all(
			request.body.files.map(async (file) => {
				const result = await uploadImage(
					Buffer.from(file.data).toString("base64"),
					file.mimetype
				);
				return result.secure_url;
			})
		);
	}
	const newSale = await Sale.create(sale);
	return reply.code(status.OK).send({ sale: newSale });
};

const updateSale = async (request, reply) => {
	const sale = await Sale.findByIdAndUpdate(
		request.params.saleId,
		request.body,
		{ new: true }
	);
	if (!sale) throw new ApiError(status.NOT_FOUND, "Sale not found");
	return reply.code(status.OK).send({ sale });
};

const deleteSale = async (request, reply) => {
	const sale = await Sale.findByIdAndDelete(request.params.saleId);
	if (!sale) throw new ApiError(status.NOT_FOUND, "Sale not found");
	sale.attachments.forEach(async (url) => {
		await deleteImage(url.split("/").pop().split(".")[0]);
	});
	return reply.code(status.OK).send({ message: "Success!" });
};

module.exports = {
	addSale,
	updateSale,
	deleteSale,
};

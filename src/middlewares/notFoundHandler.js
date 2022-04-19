const { ApiError } = require("#utils");
const status = require("http-status");

const notFoundHandler = (request, reply) => {
	throw new ApiError("Không tồn tại", status.NOT_FOUND);
};

module.exports = notFoundHandler;

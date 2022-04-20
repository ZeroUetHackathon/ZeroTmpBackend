const status = require("http-status");
const { ApiError } = require("#utils");

// eslint-disable-next-line
const notFoundHandler = (request, reply) => {
	throw new ApiError("Địa chỉ không tồn tại", status.NOT_FOUND);
};

module.exports = notFoundHandler;

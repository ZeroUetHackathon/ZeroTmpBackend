const status = require("http-status");
const { ApiError } = require("#utils");

// eslint-disable-next-line
const notFoundHandler = (request, reply) => {
	throw new ApiError(status.NOT_FOUND, "Địa chỉ không tồn tại");
};

module.exports = notFoundHandler;

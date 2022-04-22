const status = require("http-status");
const { ApiError } = require("#utils");
const { tokenService, userService } = require("#services");

// eslint-disable-next-line
const verifyToken = async (req, _) => {
	const zeroToken = req.unsignCookie(req.cookies.zeroToken);
	const zeroRefreshToken = req.unsignCookie(req.cookies.zeroRefreshToken);
	if (!zeroToken.valid || !zeroRefreshToken.valid)
		throw new ApiError(status.NOT_ACCEPTABLE, "Cookie không hợp lệ!");
	const user = await tokenService.verifyToken(
		zeroToken.value,
		zeroRefreshToken.value
	);
	req.refreshToken = zeroRefreshToken.value;
	req.user = userService.getPublicInfoUser(user);
};

module.exports = {
	verifyToken,
};

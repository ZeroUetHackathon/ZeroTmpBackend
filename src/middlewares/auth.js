const { tokenService, userService } = require("#services");

const verifyToken = async (req, _, done) => {
	const { zeroToken, zeroRefreshToken } = req.unsignCookie(
		req.cookies.cookieSigned
	);
	const user = await tokenService.verifyToken(zeroToken, zeroRefreshToken);
	req.refreshToken = zeroRefreshToken;
	req.user = userService.getPublicInfoUser(user);

	done();
};

module.exports = {
	verifyToken,
};

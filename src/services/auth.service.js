const userService = require("./user.service");
const { paseto, snowflake, ua } = require("#configs");

const loginByEmail = async (email, password) => {
	const user = await userService.getUserByEmail(email);

	/* eslint-disable */
	if (!user || !(await user?.isPasswordMatch(password)))
		throw new ApiError("Incorrect email or password!", httpStatus.UNAUTHORIZED);
	/* eslint-enable */

	return user;
};

const setupUserTokens = async (user, publicUser, headers) => {
	const token = await paseto.encode(publicUser);
	const refreshToken = snowflake.getUniqueID();
	const sessionId = snowflake.getUniqueID();
	const { browser, os } = ua.parse(headers["user-agent"]);
	const sessionDevice = `${browser.name || ""} ${browser.version || ""} ${
		os.name || ""
	} ${os.version || ""}`;
	await global.redis.zadd(
		"zero_token",
		refreshToken,
		`${sessionId}${user._id}${sessionDevice}`
	);

	return [token, refreshToken];
};

/**
 * Logout
 * @param {String} refreshToken - refresh token
 */
const logout = async (refreshToken) =>
	global.redis.logout("zero_token", "zero_blacklist", refreshToken);

module.exports = {
	loginByEmail,
	setupUserTokens,
	logout,
};

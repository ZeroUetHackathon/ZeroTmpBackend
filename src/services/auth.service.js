const ua = require("ua-parser-js");
const userService = require("./user.service");
const { paseto, snowflake } = require("#configs");

const loginByEmail = async (email, password) => {
	const user = await userService.getUserByEmail(email);

	/* eslint-disable */
	if (!user || !(await user?.isPasswordMatch(password)))
		throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password!");
	/* eslint-enable */

	return user;
};

const setupUserTokens = async (user, publicUser) => {
	const token = paseto.encrypt(publicUser);
	const refreshToken = snowflake.getUniqueID();
	const sessionId = snowflake.getUniqueID();
	const { browser, os } = ua.parse(req.headers["user-agent"]);
	const sessionDevice = `${browser.name || ""} ${browser.version || ""} ${
		os.name || ""
	} ${os.version || ""}`;
	await global.redis.zadd(
		"zero_token",
		snowflake.getUniqueID(),
		`${sessionId}${user._id}${sessionDevice}`
	);

	return [token, refreshToken];
};

/**
 * Logout
 * @param {String} refreshToken - refresh token
 */
const logout = async (refreshToken) =>
	global.redis.logout("zero_token", refreshToken);

module.exports = {
	loginByEmail,
	setupUserTokens,
	logout,
};

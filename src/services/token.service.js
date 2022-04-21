const status = require("http-status");
const { paseto, snowflake, configs } = require("#configs");
const { User } = require("#models");
const { ApiError } = require("#utils");

const getUserFromAccessToken = async (token) => paseto.decode(token);

const getUserFromRefreshToken = async (refreshToken) => {
	const [sessionId, userId, sessionDevice] = global.redis.logout(
		"zero_token",
		refreshToken
	);
	const user = await User.findById(userId);
	await global.redis.zadd(
		"zero_token",
		snowflake.getUniqueID(),
		`${sessionId}${userId}${sessionDevice}`
	);
	return user;
};

const verifyToken = async (token, refreshToken) => {
	if (!refreshToken) throw new Error("Không có Refresh Token");

	if (
		global.redis.blacklist(
			"zero_blacklist",
			snowflake.idFromTimestamp(
				Date.now() - configs.TOKEN.REFRESH_TOKEN_EXPIRE + 1
			),
			refreshToken
		)
	)
		throw new ApiError(status.UNAUTHORIZED, "Refresh Token bị blacklist");

	if (!token) return getUserFromRefreshToken(refreshToken);

	return getUserFromAccessToken(token);
};

module.exports = {
	verifyToken,
};

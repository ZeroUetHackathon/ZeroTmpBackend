const { paseto } = require('#configs')

const getUserFromAccessToken = async (token) => {
	return paseto.decode(token);
}

const getUserFromRefreshToken = async (refreshToken) => {
}

const verifyToken = async (token, refreshToken) => {
	if (!refreshToken)
		throw new Error("Refresh Token not found!");

	if (!token)
		return getUserFromRefreshToken(refreshToken);

	return getUserFromAccessToken(token);
}

module.exports = {
	verifyToken,
}

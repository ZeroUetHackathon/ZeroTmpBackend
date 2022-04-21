const status = require("http-status");
const { authService, userService } = require("#services");
const { config } = require("#configs");

// eslint-disable-next-line
const auth = async (req, rep) => {
	return rep.status(status.ACCEPTED).send({ user: req.user });
};

const login = async (req, rep) => {
	const { email, password } = req.body;
	const user = authService.loginByEmail(email, password);

	req.log.info(`User ${user.name} just login.`);

	const publicUser = userService.getPublicInfoUser(user);
	const [token, refreshToken] = authService.setupUserTokens(user, publicUser);

	return rep
		.status(status.ACCEPTED)
		.cookie("zeroToken", token, {
			expires: new Date(Date.now() + config.TOKEN.TOKEN_EXPIRE),
			secure: config.ENV === "production",
			httpOnly: true,
			signed: true,
		})
		.cookie("zeroRefreshToken", refreshToken, {
			expires: new Date(Date.now() + config.TOKEN.REFRESH_TOKEN_EXPIRE),
			secure: config.ENV === "production",
			httpOnly: true,
			signed: true,
		})
		.send({ msg: "Login Successfully", user: publicUser });
};

const register = async (req, rep) => {
	const { name, email, password, role } = req.body;
	const user = await userService.createUser(name, email, password, role);

	req.log.info(`User ${user.name} just register.`);

	const publicUser = userService.getPublicInfoUser(user);
	const [token, refreshToken] = authService.setupUserTokens(user, publicUser);

	return rep
		.status(status.ACCEPTED)
		.cookie("zeroToken", token, {
			expires: new Date(Date.now() + config.TOKEN.TOKEN_EXPIRE),
			secure: config.ENV === "production",
			httpOnly: true,
			signed: true,
		})
		.cookie("zeroRefreshToken", refreshToken, {
			expires: new Date(Date.now() + config.TOKEN.REFRESH_TOKEN_EXPIRE),
			secure: config.ENV === "production",
			httpOnly: true,
			signed: true,
		})
		.send({ msg: "Register Successfully", user: publicUser });
};

const logout = async (req, rep) => {
	await global.redis.logout("zero_token", req.refreshToken);
	return rep.status(status.ACCEPTED).send({ msg: "Logout Successfully" });
};

module.exports = {
	auth,
	login,
	register,
	logout,
};

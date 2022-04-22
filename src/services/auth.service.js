const userService = require("./user.service");

const loginByEmail = async (email, password) => {
	const user = await userService.getUserByEmail(email);

	/* eslint-disable */
	if (!user || !(await user?.isPasswordMatch(password)))
		throw new ApiError("Incorrect email or password!", httpStatus.UNAUTHORIZED);
	/* eslint-enable */

	return user;
};

module.exports = {
	loginByEmail,
};

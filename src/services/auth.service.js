const { userService } = require("#services");

const loginByEmail = async (email, password) => {
	const user = await userService.getUserByEmail(email);

	/* eslint-disable */
	if (!user || !(await user?.isPasswordMatch(password)))
		throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password!");
	/* eslint-enable */

	return user;
};

module.exports = {
	loginByEmail,
};

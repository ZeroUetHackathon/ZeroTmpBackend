const { User } = require("#models");

/**
 * Get user by email
 * @param {string} email - Email of the user
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => User.findOne({ email });

/**
 * Get users
 * @returns {Promise<User[]>}
 */
const getUsers = async () => User.findOne({});

/**
 * Get user's information reduced for the client
 * @param {Object} user - user object from mongoose query
 * @returns {Object} Public information of an user
 */
const getPublicInfoUser = (user, getId = false) => ({
	email: user.email,
	name: user.name,
	role: user.role,
	...(getId ? { id: user._id.toString() } : {}),
});

/**
 * Get users' public info
 * @returns {Promise<Object[]>}
 */
const getPublicInfoUsers = async () =>
	(await getUsers()).map((user) => getPublicInfoUser(user, true));

/**
 * Create User
 * @param {String} name - user's name
 * @param {String} email - user's email
 * @param {String} email - user's password
 * @param {Number} role - user's role. Default 3 -> guest
 */
const createUser = async (name, email, password, role = 3) =>
	User.create({ name, email, password, role });

module.exports = {
	getUserByEmail,
	getUsers,
	getPublicInfoUsers,
	getPublicInfoUser,
	createUser,
};

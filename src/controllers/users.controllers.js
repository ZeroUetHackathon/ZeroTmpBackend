const status = require("http-status");
const { userService } = require("#services");
const { Shop } = require("#models");

const getUsers = async (req, rep) => {
	// If use not admin -> throw error
	if (req.user.role !== 0)
		throw new Error("User is not allowed to get all users!");

	const users = await userService.getPublicInfoUsers();
	return rep.status(status.ACCEPTED).send({ users });
};

const createUser = async (req, rep) => {
	const { name, email, password, role } = req.body;
	const user = await userService.createUser(name, email, password, role);

	req.log.info(`User ${user.name} just got created.`);

	const publicUser = userService.getPublicInfoUser(user);
	return rep
		.status(status.ACCEPTED)
		.send({ msg: "Register Successfully", user: publicUser });
};

const addShop = async (request, reply) => {
	await Shop.create(request.body);
	return reply.code(status.OK).send({ message: "Tạo cửa hàng thành công!" });
};

module.exports = {
	getUsers,
	createUser,
	addShop,
};

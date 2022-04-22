const status = require("http-status");
const { userService } = require("#services");

const getUsers = async (req, rep) => {
	// If use not admin -> throw error
	if (req.user.role !== 0)
		throw new Error("Chỉ Admin mới được quyền lấy hết user!");

	const users = await userService.getPublicInfoUsers();
	return rep.status(status.ACCEPTED).send({ users });
};

const createUser = async (req, rep) => {
	// If use not admin -> throw error
	if (req.user.role !== 0)
		throw new Error("Chỉ Admin mới được quyền tạo user!");

	const { name, email, password, role } = req.body;
	const user = await userService.createUser(name, email, password, role);

	req.log.info(`User ${user.name} just got created.`);

	const publicUser = userService.getPublicInfoUser(user);
	return rep
		.status(status.ACCEPTED)
		.send({ msg: "Tạo user thành công", user: publicUser });
};

// eslint-disalbe-next-line
const getUser = async (req, _) => {
	const { userId } = req.params;
	if (req.user.role !== 0 && req.user._id !== userId)
		throw new Error("User chỉ được lấy thông tin của bản thân!");
};

const updateUser = async (req, rep) => {
	const { userId } = req.params;
	if (req.user.role !== 0 && req.user._id !== userId)
		throw new Error("User chỉ được quyền update thông tin của bản thân!");

	const user = await userService.getUser(userId);
	const publicUser = userService.getPublicInfoUser(user);
	return rep
		.status(status.ACCEPTED)
		.send({ msg: "Lấy user thành công", user: publicUser });
};

const deleteUser = async (req, rep) => {
	const { userId } = req.params;
	if (req.user.role !== 0 && req.user._id !== userId)
		throw new Error("User chỉ được quyền xóa thông tin của bản thân!");

	const user = await userService.updateUser(req.body, userId);
	const publicUser = userService.getPublicInfoUser(user);
	return rep
		.status(status.ACCEPTED)
		.send({ msg: "Sửa user thành công", user: publicUser });
};

module.exports = {
	getUsers,
	getUser,
	createUser,
	updateUser,
	deleteUser,
};

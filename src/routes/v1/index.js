/* eslint-disable global-require */
module.exports = {
	auth: require("./auth.routes"),
	users: require("./users.routes"),
	products: require("./products.routes"),
	carts: require("./carts.routes"),
	sales: require("./sales.routes"),
	shops: require("./shops.routes"),
};

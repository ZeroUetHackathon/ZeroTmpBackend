const tokenService = require('./token.service');
const authService = require('./auth.service');
const userService = require('./user.service');
const mongooseService = require('./moongose.service');

module.exports = {
	tokenService,
	authService,
	userService,
	mongooseService
};

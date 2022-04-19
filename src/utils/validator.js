const {
	regex: { VALID_EMAIL_REGEX },
} = require("#constants");

/**
 * Check valid email string
 * @param {string} email - email need check
 * @returns {boolean}
 */
const isEmail = (email) => String(email).toLowerCase().match(VALID_EMAIL_REGEX);

module.exports = {
	isEmail,
};

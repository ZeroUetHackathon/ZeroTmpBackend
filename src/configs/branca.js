/* eslint-disable */
const { TOKEN } = require("#configs");

const branca = require("branca")(TOKEN.SECRET);

/* eslint-enable */

/**
 * Encode the object with branca
 * @param {Any} obj - some object contains information need to be turn into
 * a token
 * @returns {String} the token
 */
const encode = (obj) => branca.encode(obj);

/**
 * Decode the object with branca and check for expired date
 * @param {String} token - token that is hashed with branca algorithm
 * @returns {Any} the hashed information
 */
const decodeToken = (token) => branca.decode(token, TOKEN.TOKEN_EXPIRE);

module.exports = {
	encode,
	decodeToken,
};

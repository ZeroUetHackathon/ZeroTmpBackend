/* eslint-disable */
const { TOKEN } = require('./config');
const { BRANCA_TYPES } = require('../constants/model.constant');

// A replacement for jwt that is somewhat better
// TODO: change it to paseto in the future if public key is needed
const branca = require('branca')(TOKEN.SECRET);
const brancaVerify = require('branca')(TOKEN.VERIFY_SECRET);

/* eslint-enable */

/**
 * Encode the object with branca
 * @param {Any} obj - some object contains information need to be turn into
 * a token
 * @returns {String} the token
 */
const encode = (obj, type = BRANCA_TYPES.TOKEN) =>
	type === BRANCA_TYPES.TOKEN ? branca.encode(obj) : brancaVerify.encode(obj);

/**
 * Decode the object with branca and check for expired date
 * @param {String} token - token that is hashed with branca algorithm
 * @returns {Any} the hashed information
 */
const decodeToken = (token, type = BRANCA_TYPES.TOKEN) =>
	type === BRANCA_TYPES.TOKEN
		? branca.decode(token, TOKEN.TOKEN_EXPIRE)
		: brancaVerify.decode(token, TOKEN.TOKEN_VERIFY_EXPIRE);

module.exports = {
	encode,
	decodeToken,
};

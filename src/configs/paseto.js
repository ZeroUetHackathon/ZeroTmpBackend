const { V3 } = require("paseto");
const config = require("./config");

const pasetoOptions = {
	iat: false,
	issuer: "zero",
	audience: "zero2",
};

const encode = async (obj) =>
	V3.encrypt(
		Object.assign(obj, { at: Math.floor(Date.now() / 1000).toString(32) }),
		config.TOKEN.SECRET,
		pasetoOptions
	);
const decode = async (token) => {
	const obj = V3.decrypt(token, config.TOKEN.SECRET, pasetoOptions);
	if (
		parseInt(obj.at, 32) - Math.floor(Date.now() / 1000) >
		config.TOKEN.TOKEN_EXPIRE / 1000
	)
		throw new Error("Expired Access Token");

	return obj;
};

module.exports = {
	encode,
	decode,
};

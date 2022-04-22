const UAParser = require("ua-parser-js");

const parser = new UAParser();

const parse = (userAgent) => {
	parser.setUA(userAgent);
	return parser.getResult();
};

module.exports = {
	parse,
};

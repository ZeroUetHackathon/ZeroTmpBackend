const { Packr } = require("msgpackr");

module.exports = new Packr({
	structuredClone: true,
	bundleStrings: true,
	useTimestamp32: true,
});

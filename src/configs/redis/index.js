const fs = require("fs");
const path = require("path");
const IoRedis = require("ioredis");

class Redis extends IoRedis {
	constructor(redisConfig) {
		super(redisConfig);

		this.defineCommand("blacklist", {
			numberOfKeys: 2,
			lua: fs.readFileSync(path.resolve(__dirname, "blacklist.lua"), "utf8"),
		});

		this.defineCommand("logout", {
			numberOfKeys: 1,
			lua: fs.readFileSync(path.resolve(__dirname, "logout.lua"), "utf8"),
		});
	}
}

module.exports = Redis;

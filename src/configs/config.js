const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const config = {
	BASE: {
		HOSTNAME: process.env.BASE_URL,
		PORT: process.env.BASE_PORT,
	},
	API_VERSION: "v1",
	DB: {
		HOST: process.env.MONGOOSE_HOST,
		PORT: process.env.MONGOOSE_PORT,
		DATABASE: process.env.MONGOOSE_DB_NAME,
	},
	CORS: {
		origin: ["localhost:3000", "http://localhost:3000"],
		credentials: true,
		optionsSuccessStatus: 200,
	},
	TOKEN: {
		SECRET: process.env.TOKEN_SECRET,
		VERIFY_SECRET: process.env.TOKEN_VERIFY_SECRET,
		// TOKEN_EXPIRE: process.env.TOKEN_EXPIRE_HOURS * 60 * 60 * 1000,
		TOKEN_EXPIRE: process.env.TOKEN_EXPIRE_HOURS * 60 * 60 * 1000,
		TOKEN_VERIFY_EXPIRE: process.env.TOKEN_EXPIRE_MINUTES * 60 * 1000,
		REFRESH_TOKEN_EXPIRE: process.env.REFRESH_TOKEN_EXPIRE_WEEKS * 7 * 24 * 60 * 60 * 1000,
		RESET_PASSWORD_TOKEN_EXPIRE: process.env.RESET_PASSWORD_TOKEN_EXPIRE_MINUTES * 60 * 1000,
		EMAIL_PASSWORD_TOKEN_EXPIRE: process.env.EMAIL_PASSWORD_TOKEN_EXPIRE_MINUTES * 60 * 1000,
	},

	get HttpUrl() {
		return `${this.BASE.HOSTNAME}:${this.BASE.PORT}`;
	},

	get DBUri() {
		return `mongodb://${this.DB.HOST}:${this.DB.PORT}/${this.DB.DATABASE}`;
	},
};

module.exports = config;

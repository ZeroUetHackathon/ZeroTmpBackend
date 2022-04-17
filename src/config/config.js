const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const config = {
	BASE: {
		HOSTNAME: envVars.BASE_URL,
		PORT: envVars.BASE_PORT,
	},
	API_VERSION: "v1",
	DB: {
		HOST: envVars.MONGOOSE_HOST,
		PORT: envVars.MONGOOSE_PORT,
		DATABASE: envVars.MONGOOSE_DB_NAME,
		CONFIGS: {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
	},
	CORS: {
		origin: ['localhost:3000', 'http://localhost:3000'],
		credentials: true,
		optionsSuccessStatus: 200,
	},
	TOKEN: {
		SECRET: envVars.TOKEN_SECRET,
		VERIFY_SECRET: envVars.TOKEN_VERIFY_SECRET,
		// TOKEN_EXPIRE: envVars.TOKEN_EXPIRE_HOURS * 60 * 60 * 1000,
		TOKEN_EXPIRE: envVars.TOKEN_EXPIRE_HOURS * 60 * 60 * 1000,
		TOKEN_VERIFY_EXPIRE: envVars.TOKEN_EXPIRE_MINUTES * 60 * 1000,
		REFRESH_TOKEN_EXPIRE: envVars.REFRESH_TOKEN_EXPIRE_WEEKS * 7 * 24 * 60 * 60 * 1000,
		RESET_PASSWORD_TOKEN_EXPIRE: envVars.RESET_PASSWORD_TOKEN_EXPIRE_MINUTES * 60 * 1000,
		EMAIL_PASSWORD_TOKEN_EXPIRE: envVars.EMAIL_PASSWORD_TOKEN_EXPIRE_MINUTES * 60 * 1000,
	},

	getHttpUrl() {
		return `${this.BASE.hostname}:${this.BASE.port}`;
	},

	getDBUri() {
		return `mongodb://${this.DB.HOST}:${this.DB.PORT}/${this.DB.DATABASE}`;
	},
}

module.exports = config;

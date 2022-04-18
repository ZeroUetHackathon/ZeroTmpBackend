const app = require("./app");
const { config } = require("#configs");

const server = app({ logger: true });

server.listen(config.BASE.PORT || 5000, config.BASE.HOSTNAME, (err, address) => {
	if (err) {
		console.log(err);
		process.exit(1);
	}
});

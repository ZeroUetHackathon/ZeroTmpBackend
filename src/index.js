const appInit = require("./app");
const { config } = require("#configs");

const server = appInit({
	logger: {
		prettyPrint: {
			translateTime: true,
			ignore: "pid,hostname,reqId,responseTime,req,res",
			messageFormat:
				"{msg} [id={reqId} {req.method} {req.url}:> {responseTime}]",
		},
	},
});

server.listen(
	config.BASE.PORT || 5000,
	config.BASE.HOSTNAME,
	(err, address) => {
		if (err) {
			// eslint-disable-next-line
			console.log(err);
			process.exit(1);
		}
		// eslint-disable-next-line
		console.log(`server listening on ${address}`);
	}
);

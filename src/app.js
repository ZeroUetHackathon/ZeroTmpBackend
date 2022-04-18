const fastify = require('fastify');
const cookie = require('fastify-cookie');
const cors = require('fastify-cors');

const config = require('./config/config');

const users = require(`./routes/${config.API_VERSION}/users`);
const auth = require(`./routes/${config.API_VERSION}/auth`);

const app = (opts = {}) => {
  const app = fastify(opts);

  app.register(cors, {
    origin: true,
    credentials: true,
  });

  app.register(cookie);

  // Setup routes
  app.register(users, { prefix: `/${config.API_VERSION}/users` });
  app.register(auth, { prefix: `/${config.API_VERSION}/auth` });

  return app;
};

module.exports = app;

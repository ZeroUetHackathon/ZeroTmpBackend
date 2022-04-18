const argon2 = require('argon2');

const argon2Opt = {
  type: argon2.argon2id,
};

const hash = async (password) => argon2.hash(password, argon2Opt);
const verify = async (hashedPassword, input) => argon2.verify(hashedPassword, input);

module.exports = {
  hash,
  verify,
};

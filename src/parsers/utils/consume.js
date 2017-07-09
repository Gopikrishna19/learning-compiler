const {ExpectedTokenError} = require('../errors/expected-token');
const {expect} = require('./expect');

const consume = (tokens, values) => {

  const token = expect(tokens, values);

  if (!token) {

    throw new ExpectedTokenError(Array.from(values), tokens);

  }

  return token;

};

module.exports = {
  consume
};

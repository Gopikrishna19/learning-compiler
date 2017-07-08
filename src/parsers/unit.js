const {UnexpectedTokenError} = require('./errors/unexpected-token.js');

const readUnit = input => {

  const token = input.next();

  throw new UnexpectedTokenError(token, input);

};

module.exports = {
  readUnit
};

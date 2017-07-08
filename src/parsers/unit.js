const {NUMBER} = require('../tokenizers/numbers');
const {UnexpectedTokenError} = require('./errors/unexpected-token.js');

const readUnit = input => {

  const token = input.next();

  if(token.type === NUMBER) {

    return token;

  }

  throw new UnexpectedTokenError(token, input);

};

module.exports = {
  readUnit
};

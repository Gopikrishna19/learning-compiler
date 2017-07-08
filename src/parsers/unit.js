const {IDENTIFIER} = require('../tokenizers/identifiers');
const {NUMBER} = require('../tokenizers/numbers');
const {STRING} = require('../tokenizers/strings');
const {UnexpectedTokenError} = require('./errors/unexpected-token.js');

const readUnit = input => {

  const token = input.next();

  if(token.type === NUMBER || token.type === STRING || token.type === IDENTIFIER) {

    return token;

  }

  throw new UnexpectedTokenError(token, input);

};

module.exports = {
  readUnit
};

const {isBoolean, parseBoolean} = require('./booleans');
const {IDENTIFIER} = require('../tokenizers/identifiers');
const {NUMBER} = require('../tokenizers/numbers');
const {STRING} = require('../tokenizers/strings');
const {UnexpectedTokenError} = require('./errors/unexpected-token.js');

const readUnit = input => {

  const token = input.peek();

  if (isBoolean(token)) {

    return parseBoolean(input.next());

  } else if (token.type === NUMBER || token.type === STRING || token.type === IDENTIFIER) {

    return input.next();

  }

  throw new UnexpectedTokenError(token, input);

};

module.exports = {
  readUnit
};

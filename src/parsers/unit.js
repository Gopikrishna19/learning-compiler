const {isBoolean, parseBoolean} = require('./booleans');
const {IDENTIFIER} = require('../tokenizers/identifiers');
const {NUMBER} = require('../tokenizers/numbers');
const {STRING} = require('../tokenizers/strings');
const {UnexpectedTokenError} = require('./errors/unexpected-token.js');

const readUnit = tokens => {

  const token = tokens.peek();

  if (isBoolean(token)) {

    return parseBoolean(tokens.next());

  } else if (token.type === NUMBER || token.type === STRING || token.type === IDENTIFIER) {

    return tokens.next();

  }

  throw new UnexpectedTokenError(token, tokens);

};

module.exports = {
  readUnit
};

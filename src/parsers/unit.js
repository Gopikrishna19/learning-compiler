const {isBlock, readBlock} = require('./block');
const {isBoolean, parseBoolean} = require('./booleans');
const {isIf, parseIf} = require('./if');
const {isSemi, readSemi} = require('./semi');
const {IDENTIFIER} = require('../tokenizers/identifiers');
const {NUMBER} = require('../tokenizers/numbers');
const {STRING} = require('../tokenizers/strings');
const {UnexpectedTokenError} = require('./errors/unexpected-token.js');

const readUnit = tokens => {

  const token = tokens.peek();

  if (isBlock(token, new Set(['']))) {

    return readBlock(tokens);

  } else if (isIf(token)) {

    return parseIf(tokens);

  } else if (isBoolean(token)) {

    return parseBoolean(tokens.next());

  } else if (token.type === NUMBER || token.type === STRING || token.type === IDENTIFIER) {

    return tokens.next();

  } else if (isSemi(token)) {

    return readSemi(tokens);

  }

  throw new UnexpectedTokenError(token, tokens);

};

module.exports = {
  readUnit
};

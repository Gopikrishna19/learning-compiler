const {isBlock, readBlock} = require('./block');
const {isBoolean, readBoolean} = require('./booleans');
const {isIf, readIf} = require('./if');
const {isLambda, readLambda} = require('./lambda');
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

    return readIf(tokens);

  } else if (isBoolean(token)) {

    return readBoolean(tokens.next());

  } else if (isLambda(token)) {

    return readLambda(tokens);

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

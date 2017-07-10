const {UnexpectedTokenError} = require('./errors/unexpected-token');
const {consume} = require('./utils/consume.js');
const {expect} = require('./utils/expect');
const {isKeyword} = require('./utils/is.js');
const keywords = require('../tokenizers/identifiers.js');

const COMMA = new Set([',']);
const PAREN_CLOSE = new Set([')']);
const PAREN_OPEN = new Set(['(']);

const LAMBDA = Symbol.for('LAMBDA');

const isLambda = token => isKeyword(token, keywords.LAMBDA);

const readLambda = tokens => {

  const {isBlock, readBlock} = require('./block');
  const {readCall} = require('./call');

  consume(tokens, keywords.LAMBDA);
  consume(tokens, PAREN_OPEN);

  const parameters = [];

  while (!tokens.EOF && !expect(tokens, PAREN_CLOSE)) {

    const identifier = tokens.next();

    if (identifier.type !== keywords.IDENTIFIER) {

      throw new UnexpectedTokenError(identifier, tokens);

    }

    parameters.push(identifier.value);

    expect(tokens, COMMA);

  }

  const body = isBlock(tokens.peek()) ? readBlock(tokens) : readCall(tokens);

  return {
    body,
    parameters,
    type: LAMBDA
  };

};

module.exports = {
  COMMA,
  PAREN_CLOSE,
  PAREN_OPEN,
  isLambda,
  readLambda
};

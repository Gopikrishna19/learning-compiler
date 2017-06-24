const {UnexpectedCharError} = require('./errors/unexpected-char');
const {readSpaces} = require('./spaces');
const {readers} = require('.');

const UNDEFINED = Symbol.for('UNDEFINED');

const getNextToken = (char, input) =>
  readers.reduce((token, reader) => {

    if (token === UNDEFINED && reader.check(char)) {

      return reader.read(input);

    }

    return token;

  }, UNDEFINED);

const readNext = stream => {

  const {input} = stream;

  readSpaces(input);

  if (input.EOF) {

    return null;

  }

  const char = input.peek();
  const next = getNextToken(char, input);

  if (next !== UNDEFINED) {

    return next;

  }

  throw new UnexpectedCharError(char, input);

};

module.exports = {
  readNext
};

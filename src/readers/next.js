const {UnexpectedCharError} = require('./errors/unexpected-char.js');
const {isComment, readComment} = require('./comments.js');
const {isIdentifier, readIdentifier} = require('./identifiers.js');
const {isNumber, readNumber} = require('./numbers.js');
const {isString, readString} = require('./strings.js');
const {isSymbol, readSymbol} = require('./symbols.js');
const {readSpaces} = require('./spaces.js');

const UNDEFINED = Symbol.for('UNDEFINED');

const readers = [
  {
    check: isComment,
    read: readComment
  },
  {
    check: isString,
    read: readString
  },
  {
    check: isNumber,
    read: readNumber
  },
  {
    check: isIdentifier,
    read: readIdentifier
  },
  {
    check: isSymbol,
    read: readSymbol
  }
];

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

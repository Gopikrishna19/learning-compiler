const {UnexpectedCharError} = require('./errors/unexpected-char.js');
const {isComment, readComments} = require('./comments.js');
const {isIdentifier, readIdentifier} = require('./identifiers.js');
const {isNumber, readNumber} = require('./numbers.js');
const {isString, readString} = require('./strings.js');
const {readSpaces} = require('./spaces.js');

const readNext = stream => {

  const {input} = stream;

  readSpaces(input);

  if (input.EOF) {

    return null;

  }

  const char = input.peek();

  if (isComment(char)) {

    readComments(input);

    return readNext(stream);

  } else if (isString(char)) {

    return readString(input, input.next());

  } else if (isNumber(char)) {

    return readNumber(input);

  } else if (isIdentifier(char)) {

    return readIdentifier(input);

  }

  throw new UnexpectedCharError(char, input);

};

module.exports = {
  readNext
};

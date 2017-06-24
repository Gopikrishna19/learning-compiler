const {COMMENTS, readComments} = require('./comments.js');
const {QUOTES, readString} = require('./strings.js');
const {isNumber, readNumber} = require('./numbers.js');
const {isOneOf} = require('./utils/is.js');
const {readSpaces} = require('./spaces.js');

const readNext = stream => {

  const {input} = stream;

  readSpaces(input);

  if (input.EOF) {

    return null;

  }

  const char = input.peek();

  if (isOneOf(char, COMMENTS)) {

    readComments(input);

    return readNext(stream);

  } else if (isOneOf(char, QUOTES)) {

    return readString(input, input.next());

  } else if (isNumber(char)) {

    return readNumber(input);

  }

  return stream.fail(`Unexpected character: ${char}`);

};

module.exports = {
  readNext
};

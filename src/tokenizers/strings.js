const {UnexpectedEOFError} = require('./errors/unexpected-eof');
const {isOneOf} = require('./utils/is');

const ESCAPES = {
  '"': '"',
  '\'': '\'',
  '`': '`',
  'f': '\f',
  'n': '\n',
  'r': '\r',
  't': '\t',
  'v': '\v'
};

const QUOTES = new Set([
  '\'',
  '\"',
  '\`'
]);

const STRING = Symbol.for('STRING');

const isString = char => isOneOf(char, QUOTES);

const readString = input => {

  const quote = input.next();
  let escaped = false,
    sequence = '';

  while (!input.EOF) {

    let char = input.next();

    if (escaped) {

      const escapedChar = ESCAPES[char];

      char = escapedChar ? escapedChar : char;
      escaped = false;

    } else if (char === quote) {

      return {
        type: STRING,
        value: sequence
      };

    } else if (char === '\\') {

      escaped = true;
      char = '';

    }

    sequence += char;

  }

  throw new UnexpectedEOFError(quote, sequence, input);

};

module.exports = {
  isString,
  readString
};

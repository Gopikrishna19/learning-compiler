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

const readString = (input, quote) => {

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

  return input.fail(`Unexpected end of input: ${quote}${sequence}`);

};

module.exports = {
  QUOTES,
  readString
};

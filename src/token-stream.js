const {Tokens} = require('./tokens');
const {Types} = require('./types');

class TokenStream {

  static isOneOf(value, set) {

    return set.has(value);

  }

  static isNotNewline(char) {

    return !TokenStream.isOneOf(char, Tokens.NEWLINES);

  }

  static isNumber(char) {

    return char >= '0' && char <= '9';

  }

  static isSpace(char) {

    return TokenStream.isOneOf(char, Tokens.SPACES);

  }

  static readNext(stream) {

    const {input} = stream;

    TokenStream.readWhile(input, TokenStream.isSpace);

    if (input.EOF) {

      return null;

    }

    const char = input.peek();

    if (TokenStream.isOneOf(char, Tokens.COMMENTS)) {

      TokenStream.skipComment(input);

      return TokenStream.readNext(stream);

    } else if (TokenStream.isOneOf(char, Tokens.QUOTES)) {

      return TokenStream.readString(input, input.next());

    } else if (TokenStream.isNumber(char)) {

      return TokenStream.readNumber(input);

    }

    return stream.fail(`Unexpected character: ${char}`);

  }

  static readNumber(input) {

    let sequence = '';

    while (!input.EOF) {

      const char = input.next();

      if (TokenStream.isNumber(char)) {

        sequence += char;

      }

    }

    return {
      type: Types.NUMBER,
      value: Number(sequence)
    };

  }

  static readString(input, quote) {

    let escaped = false,
      sequence = '';

    while (!input.EOF) {

      let char = input.next();

      if (escaped) {

        char = Tokens.ESCAPES[char] ? Tokens.ESCAPES[char] : char;
        escaped = false;

      } else if (char === quote) {

        return {
          type: Types.STRING,
          value: sequence
        };

      } else if (char === '\\') {

        escaped = true;
        char = '';

      }

      sequence += char;

    }

    return input.fail(`Unexpected end of input: ${quote}${sequence}`);

  }

  static readWhile(input, predicate) {

    let sequence = '';

    while (!input.EOF && predicate(input.peek())) {

      sequence += input.next();

    }

    return sequence;

  }

  static skipComment(input) {

    TokenStream.readWhile(input, TokenStream.isNotNewline);

    input.next();

  }

  constructor(input) {

    this.current = null;
    this.fail = input.fail.bind(input);
    this.input = input;

  }

  next() {

    return TokenStream.readNext(this);

  }

}

module.exports = {
  TokenStream
};

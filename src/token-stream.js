const {Tokens} = require('./tokens');
const {Types} = require('./types');

class TokenStream {

  static is(value, set) {

    return set.has(value);

  }

  static isNotNewline(char) {

    return !TokenStream.is(char, Tokens.NEWLINE);

  }

  static isSpace(char) {

    return TokenStream.is(char, Tokens.SPACES);

  }

  static readNext(stream) {

    const {input} = stream;

    TokenStream.readWhile(input, TokenStream.isSpace);

    if (input.EOF) {

      return null;

    }

    const char = input.peek();

    if (TokenStream.is(char, Tokens.COMMENT)) {

      TokenStream.skipComment(input);

      return TokenStream.readNext(stream);

    }

    if (TokenStream.is(char, Tokens.QUOTES)) {

      return TokenStream.readString(input, input.next());

    }

    return stream.fail(`Unexpected character: ${char}`);

  }

  static readString(input, quote) {

    let sequence = '';

    while (!input.EOF) {

      const char = input.next();

      if (char === quote) {

        return {
          type: Types.STRING,
          value: sequence
        };

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

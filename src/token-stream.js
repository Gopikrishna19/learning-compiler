const {Tokens} = require('./tokens');

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

    if (input.eof()) {

      return null;

    }

    const char = input.peek();

    if (TokenStream.is(char, Tokens.COMMENT)) {

      TokenStream.skipComment(input);

      return TokenStream.readNext(stream);

    }

    return stream.fail(`Unexpected character: ${char}`);

  }

  static readWhile(input, predicate) {

    let sequence = '';

    while (!input.eof() && predicate(input.peek())) {

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

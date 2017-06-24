class TokenStream {

  static readNext(stream) {

    const {input} = stream;

    if (input.eof()) {

      return null;

    }

    const char = input.peek();

    if (char === '#') {

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

    const tillEndOfLine = char => char !== '\n';

    TokenStream.readWhile(input, tillEndOfLine);

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

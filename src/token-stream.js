class TokenStream {

  static readNext(stream) {

    const {input} = stream;

    if (input.eof()) {

      return null;

    }

    const char = input.peek();

    return stream.fail(`Unexpected character: ${char}`);

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

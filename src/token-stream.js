class TokenStream {

  static readNext(stream) {

    if (stream.input.eof()) {

      return null;

    }

    return null;

  }

  constructor(input) {

    this.current = null;
    this.input = input;

  }

  next() {

    return TokenStream.readNext(this);

  }

}

module.exports = {
  TokenStream
};

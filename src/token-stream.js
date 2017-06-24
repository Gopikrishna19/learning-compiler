const {readNext} = require('./readers/next.js');

class TokenStream {

  constructor(input) {

    this.current = null;
    this.fail = input.fail.bind(input);
    this.input = input;

  }

  next() {

    return readNext(this);

  }

}

module.exports = {
  TokenStream
};

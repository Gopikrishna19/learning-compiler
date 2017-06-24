const {readNext} = require('./readers/next.js');

class TokenStream {

  constructor(input) {

    this.current = null;
    this.input = input;

  }

  next() {

    return readNext(this);

  }

}

module.exports = {
  TokenStream
};

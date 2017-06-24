const {readNext} = require('./readers/next');

class TokenStream {

  constructor(input) {

    this.$$current = null;
    this.input = input;

  }

  peek() {

    return this.$$current || (this.$$current = this.next());

  }

  next() {

    const token = this.$$current;

    this.$$current = null;

    return token || readNext(this);

  }

}

module.exports = {
  TokenStream
};

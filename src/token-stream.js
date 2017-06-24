const {readNext} = require('./readers/next');

class TokenStream {

  get EOF() {

    return this.peek() === null;

  }

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

const {InputError} = require('./input.js');

class UnexpectedEOFError extends InputError {

  constructor(quote, sequence, input) {

    super(`Unexpected end of input: ${quote}${sequence}`, input);

  }

}

module.exports = {
  UnexpectedEOFError
};

const {InputError} = require('./input');

class UnexpectedCharError extends InputError {

  constructor(char, input) {

    super(`Unexpected character: ${char}`, input);

  }

}

module.exports = {
  UnexpectedCharError
};

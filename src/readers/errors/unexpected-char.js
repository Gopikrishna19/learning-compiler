const {InputError} = require('./input.js');

class UnexpectedCharError extends InputError {

  constructor(char, input) {

    super(`Unexpected character: ${char}`, input);

  }

}

module.exports = {
  UnexpectedCharError
};

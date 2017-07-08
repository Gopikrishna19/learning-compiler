const {InputError} = require('../../tokenizers/errors/input');

class TokenError extends InputError {

  constructor(message, tokens) {

    super(message, tokens.input);

  }

}

module.exports = {
  TokenError
};

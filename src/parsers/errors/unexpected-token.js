const {TokenError} = require('./token');

class UnexpectedTokenError extends TokenError {

  constructor(token, tokens) {

    super(`Unexpected token: ${JSON.stringify(token)}`, tokens);

  }

}

module.exports = {
  UnexpectedTokenError
};

const {TokenError} = require('./token');

class ExpectedTokenError extends TokenError {

  constructor(token, tokens) {

    super(`Expected token: ${JSON.stringify(token)}`, tokens);

  }

}

module.exports = {
  ExpectedTokenError
};

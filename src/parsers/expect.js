const {peek} = require('./peek');

const expect = (tokens, ...matches) => {

  if (peek(tokens, ...matches)) {

    return tokens.next();

  }

  return null;

};

module.exports = {
  expect
};

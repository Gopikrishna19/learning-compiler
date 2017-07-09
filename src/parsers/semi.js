const {isSymbol} = require('./utils/is');

const SEMI = new Set([';']);

const isSemi = token => isSymbol(token, SEMI);

const readSemi = tokens => {

  tokens.next();

  return null;

};

module.exports = {
  isSemi,
  readSemi
};

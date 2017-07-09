const {KEYWORD} = require('../../tokenizers/identifiers');
const {SYMBOL} = require('../../tokenizers/symbols');
const {isOneOf} = require('../../tokenizers/utils/is');

const isKeyword = (token, types) => token && token.type === KEYWORD && isOneOf(token.value, types);
const isSymbol = (token, types) => token && token.type === SYMBOL && isOneOf(token.value, types);

module.exports = {
  isKeyword,
  isSymbol
};

const {KEYWORD} = require('../../tokenizers/identifiers');
const {isOneOf} = require('../../tokenizers/utils/is');

const isKeyword = (token, types) => token && token.type === KEYWORD && isOneOf(token.value, types);

module.exports = {
  isKeyword
};

const {BOOLEANS} = require('../tokenizers/identifiers');
const {isKeyword} = require('./utils/is');

const BOOLEAN = Symbol.for('BOOLEAN');

const isBoolean = token => isKeyword(token, BOOLEANS);

const readBoolean = token => ({
  type: BOOLEAN,
  value: token.value === 'true'
});

module.exports = {
  isBoolean,
  readBoolean
};

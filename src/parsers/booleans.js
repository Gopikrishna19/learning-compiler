const {BOOLEANS} = require('../tokenizers/identifiers');
const {isKeyword} = require('./keyword');

const BOOLEAN = Symbol.for('BOOLEAN');

const isBoolean = token => isKeyword(token, BOOLEANS);

const parseBoolean = token => ({
  type: BOOLEAN,
  value: token.value === 'true'
});

module.exports = {
  isBoolean,
  parseBoolean
};

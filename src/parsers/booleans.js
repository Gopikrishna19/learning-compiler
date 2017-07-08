const {KEYWORD} = require('../tokenizers/identifiers');

const BOOLEAN = Symbol.for('BOOLEAN');

const isBooleanString = value => [
  'true',
  'false'
].indexOf(value) >= 0;

const isBoolean = token => token.type === KEYWORD && isBooleanString(token.value);

const parseBoolean = token => ({
  type: BOOLEAN,
  value: token.value === 'true'
});

module.exports = {
  isBoolean,
  parseBoolean
};

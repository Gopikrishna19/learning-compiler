const {isOneOf} = require('./utils/is.js');

const SYMBOLS = new Set([
  '(',
  ')',
  '{',
  '}',
  '[',
  ']',
  ',',
  ';',
  '.'
]);

const SYMBOL = Symbol.for('SYMBOL');

const isSymbol = char => isOneOf(char, SYMBOLS);

const readSymbol = input => ({
  type: SYMBOL,
  value: input.next()
});

module.exports = {
  isSymbol,
  readSymbol
};

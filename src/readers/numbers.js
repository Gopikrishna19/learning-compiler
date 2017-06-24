const {isOneOf} = require('./utils/is.js');
const {readWhile} = require('./utils/while.js');

const DECIMALS = new Set(['.']);
const NUMBER = Symbol.for('NUMBER');

const isNumber = char => char >= '0' && char <= '9';
const isValidNumber = char => isNumber(char) || isOneOf(char, DECIMALS);

const readNumber = input => ({
  type: NUMBER,
  value: Number(readWhile(input, isValidNumber))
});

module.exports = {
  isNumber,
  readNumber
};

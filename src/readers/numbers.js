const {isOneOf} = require('./utils/is');
const {readWhile} = require('./utils/while');

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

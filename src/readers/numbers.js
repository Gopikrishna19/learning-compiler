const {isOneOf} = require('./utils/is.js');

const DECIMALS = new Set(['.']);
const NUMBER = Symbol.for('NUMBER');

const isNumber = char => char >= '0' && char <= '9';

const readNumber = input => {

  let sequence = '';

  while (!input.EOF) {

    const char = input.next();

    if (isNumber(char) || isOneOf(char, DECIMALS)) {

      sequence += char;

    }

  }

  return {
    type: NUMBER,
    value: Number(sequence)
  };

};

module.exports = {
  isNumber,
  readNumber
};

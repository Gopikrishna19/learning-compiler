const operators = require('../tokenizers/operators');
const {expect} = require('./expect');
const {readUnit} = require('./unit.js');

const BINARY = Symbol.for('BINARY');

const OPERATORS = new Set([
  ...operators.MULTIPLICATIVES,
  ...operators.ADDITIVES,
  ...operators.COMPARISION,
  ...operators.LOGICAL
]);

const readBinary = tokens => {

  let left = readUnit(tokens),
    operator = expect(tokens, OPERATORS);

  while (operator) {

    left = {
      left,
      operator: operator.value,
      right: readUnit(tokens),
      type: BINARY
    };

    operator = expect(tokens, OPERATORS);

  }

  return left;

};

module.exports = {
  readBinary
};

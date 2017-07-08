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

  const left = readUnit(tokens);
  const operator = expect(tokens, OPERATORS);

  if (operator) {

    return {
      left,
      operator: operator.value,
      right: readUnit(tokens),
      type: BINARY
    };

  }

  return left;

};

module.exports = {
  readBinary
};

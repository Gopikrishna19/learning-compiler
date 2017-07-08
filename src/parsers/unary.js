const {ADDITIVES, NEGATION} = require('../tokenizers/operators');
const {expect} = require('./expect');
const {readUnit} = require('./unit.js');

const UNARY = Symbol.for('UNARY');

const OPERATORS = new Set([
  ...ADDITIVES,
  ...NEGATION
]);

const readUnary = tokens => {

  const operator = expect(tokens, OPERATORS);

  return operator ? {
    operator: operator.value,
    right: readUnary(tokens),
    type: UNARY
  } : readUnit(tokens);

};

module.exports = {
  readUnary
};

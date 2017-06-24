const {isOneOf} = require('./utils/is');

const ARITHMETIC = new Set([
  '+',
  '-',
  '*',
  '/',
  '%',
  '='
]);

const LOGICAL = new Set([
  '&',
  '|',
  '!'
]);

const COMPARISION = new Set([
  '<',
  '>',
  '<=',
  '>=',
  '==',
  '!='
]);

const OPERATORS = new Set([
  ...ARITHMETIC,
  ...LOGICAL,
  ...COMPARISION
]);

const OPERATOR = Symbol.for('OPERATOR');

const isOperator = char => isOneOf(char, OPERATORS);

const readOperator = input => {

  let operator = input.next();

  if (isOperator(input.peek())) {

    operator += input.next();

  }

  return {
    type: OPERATOR,
    value: operator
  };

};

module.exports = {
  isOperator,
  readOperator
};

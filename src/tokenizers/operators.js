const {isOneOf} = require('./utils/is');

const ADDITIVES = new Set([
  '+',
  '-'
]);

const ASSIGNMENTS = new Set([
  '='
]);

const COMPARISION = new Set([
  '<',
  '>',
  '<=',
  '>=',
  '==',
  '!='
]);

const MULTIPLICATIVES = new Set([
  '*',
  '/',
  '%'
]);

const NEGATION = new Set(['!']);

const LOGICAL = new Set([
  '&',
  '|',
  ...NEGATION
]);

const OPERATORS = new Set([
  ...MULTIPLICATIVES,
  ...ADDITIVES,
  ...ASSIGNMENTS,
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
  ADDITIVES,
  ASSIGNMENTS,
  COMPARISION,
  LOGICAL,
  MULTIPLICATIVES,
  NEGATION,
  isOperator,
  readOperator
};

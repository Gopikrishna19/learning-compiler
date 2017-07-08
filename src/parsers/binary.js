const operators = require('../tokenizers/operators');
const {expect} = require('./expect');
const {readUnit} = require('./unit.js');

const BINARY = Symbol.for('BINARY');

const readNextPrecedent = (tokens, OPERATORS, readNext) => {

  let left = readNext(),
    operator = expect(tokens, OPERATORS);

  while (operator) {

    left = {
      left,
      operator: operator.value,
      right: readNext(),
      type: BINARY
    };

    operator = expect(tokens, OPERATORS);

  }

  return left;

};

const readBinary = tokens => {

  const multiplicatives = () => readNextPrecedent(tokens, operators.MULTIPLICATIVES, () => readUnit(tokens));
  const additives = () => readNextPrecedent(tokens, operators.ADDITIVES, multiplicatives);
  const comparision = () => readNextPrecedent(tokens, operators.COMPARISION, additives);
  const logical = () => readNextPrecedent(tokens, operators.LOGICAL, comparision);

  return logical();

};

module.exports = {
  readBinary
};

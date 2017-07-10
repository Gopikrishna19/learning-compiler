const {IDENTIFIER} = require('../tokenizers/identifiers');
const {expect} = require('./utils/expect');
const {readAssign} = require('./assign');

const CALL = Symbol.for('CALL');

const readCall = tokens => {

  const {COMMA, PAREN_CLOSE, PAREN_OPEN} = require('./lambda');

  let node = readAssign(tokens);

  if (node && node.type === IDENTIFIER && expect(tokens, PAREN_OPEN)) {

    const arguments = [];

    while (!tokens.EOF && !expect(tokens, PAREN_CLOSE)) {

      arguments.push(readCall(tokens));

      expect(tokens, COMMA);

    }

    node = {
      arguments,
      name: node.value,
      type: CALL
    };

  }

  return node;

};

module.exports = {
  readCall
};

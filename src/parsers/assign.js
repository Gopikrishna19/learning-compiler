const {ASSIGNMENTS} = require('../tokenizers/operators');
const {expect} = require('./utils/expect');
const {readBinary} = require('./binary.js');

const ASSIGN = Symbol.for('ASSIGN');

const readAssign = tokens => {

  const left = readBinary(tokens);

  if (expect(tokens, ASSIGNMENTS)) {

    return {
      left,
      right: readAssign(tokens),
      type: ASSIGN
    };

  }

  return left;

};

module.exports = {
  readAssign
};

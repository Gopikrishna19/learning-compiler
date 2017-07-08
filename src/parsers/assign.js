const {expect} = require('./expect');
const {readUnit} = require('./unit.js');

const ASSIGN = Symbol.for('ASSIGN');
const ASSIGNMENTS = new Set(['=']);

const readAssign = tokens => {

  const left = readUnit(tokens);

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

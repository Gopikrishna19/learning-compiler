const {expect} = require('./expect');
const {readUnit} = require('./unit.js');

const ASSIGN = Symbol.for('ASSIGN');

const readAssign = tokens => {

  const left = readUnit(tokens);

  if (expect(tokens, '=')) {

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

const {readUnit} = require('./unit');

const PROGRAM = Symbol.for('PROGRAM');

const readProgram = tokens => {

  const program = [];

  while (!tokens.EOF) {

    program.push(readUnit(tokens));

  }

  return {
    program,
    type: PROGRAM
  };

};

module.exports = {
  readProgram
};

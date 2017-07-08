const {readUnit} = require('./unit');

const PROGRAM = Symbol.for('PROGRAM');

const readProgram = input => {

  const program = [];

  while (!input.EOF) {

    program.push(readUnit(input));

  }

  return {
    program,
    type: PROGRAM
  };

};

module.exports = {
  readProgram
};

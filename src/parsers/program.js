const {readAssign} = require('./assign');

const PROGRAM = Symbol.for('PROGRAM');

const readProgram = tokens => {

  const program = [];

  while (!tokens.EOF) {

    program.push(readAssign(tokens));

  }

  return {
    program: program.filter(valid => valid),
    type: PROGRAM
  };

};

module.exports = {
  PROGRAM,
  readProgram
};

const {readAssign} = require('./assign');

const PROGRAM = Symbol.for('PROGRAM');

const readProgram = tokens => {

  const program = [];

  while (!tokens.EOF) {

    program.push(readAssign(tokens));

  }

  return {
    program,
    type: PROGRAM
  };

};

module.exports = {
  readProgram
};

const {readCall} = require('./call');

const PROGRAM = Symbol.for('PROGRAM');

const readProgram = tokens => {

  const program = [];

  while (!tokens.EOF) {

    program.push(readCall(tokens));

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

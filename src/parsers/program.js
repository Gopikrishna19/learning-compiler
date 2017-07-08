const PROGRAM = Symbol.for('PROGRAM');

const readProgram = input => {

  const program = [];

  while (!input.EOF) {

  }

  return {
    program,
    type: PROGRAM
  };

};

module.exports = {
  readProgram
};

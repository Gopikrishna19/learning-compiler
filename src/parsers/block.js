const {consume} = require('./utils/consume');
const {isSymbol} = require('./utils/is');
const {expect} = require('./utils/expect');

const BLOCK_CLOSE = new Set(['}']);
const BLOCK_OPEN = new Set(['{']);

const isBlock = token => isSymbol(token, BLOCK_OPEN);

const readBlock = tokens => {

  const {PROGRAM} = require('./program');
  const {readCall} = require('./call');

  let program = [];

  consume(tokens, BLOCK_OPEN);

  do {

    program.push(readCall(tokens));

  } while (!tokens.EOF && !expect(tokens, BLOCK_CLOSE));

  program = program.filter(valid => valid);

  if (!program.length) {

    return null;

  } else if (program.length === 1) {

    return program[0];

  }

  return {
    program: program.filter(valid => valid),
    type: PROGRAM
  };

};

module.exports = {
  BLOCK_CLOSE,
  BLOCK_OPEN,
  isBlock,
  readBlock
};

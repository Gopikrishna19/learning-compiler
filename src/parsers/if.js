const {consume} = require('./utils/consume');
const {isKeyword} = require('./utils/is');

const CONDITION = Symbol.for('CONDITION');

const ELSE = new Set(['else']);
const IF = new Set(['if']);
const THEN = new Set(['then']);

const isIf = token => isKeyword(token, IF);
const isElse = token => isKeyword(token, ELSE);
const isThen = token => isKeyword(token, THEN);

const parseIf = tokens => {

  const {readBinary} = require('./binary');

  consume(tokens, IF);

  const condition = readBinary(tokens);

  if (isThen(tokens.peek())) {

    consume(tokens, THEN);

  }

  const thenPart = readBinary(tokens);

  const node = {
    condition,
    thenPart,
    type: CONDITION
  };

  if (isElse(tokens.peek())) {

    consume(tokens, ELSE);

    node.elsePart = readBinary(tokens);

  }

  return node;

};

module.exports.isIf = isIf;
module.exports.parseIf = parseIf;

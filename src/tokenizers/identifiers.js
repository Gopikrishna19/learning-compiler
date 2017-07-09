const {readWhile} = require('./utils/while');

const BOOLEANS = new Set([
  'true',
  'false'
]);

const KEYWORDS = new Set([
  'if',
  'then',
  'else',
  'lambda',
  ...BOOLEANS
]);

const IDENTIFIER = Symbol.for('IDENTIFIER');
const KEYWORD = Symbol.for('KEYWORD');

const isIdentifier = char => /[a-zA-Z_$]/.test(char);
const isValidIdentifier = char => /[a-zA-Z0-9_$\-]/.test(char);

const readIdentifier = input => {

  const value = readWhile(input, isValidIdentifier);

  return {
    type: KEYWORDS.has(value) ? KEYWORD : IDENTIFIER,
    value
  };

};

module.exports = {
  BOOLEANS,
  IDENTIFIER,
  KEYWORD,
  isIdentifier,
  readIdentifier
};

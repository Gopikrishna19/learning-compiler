const {readWhile} = require('./utils/while');

const KEYWORDS = new Set([
  'if',
  'then',
  'else',
  'lambda',
  'true',
  'false'
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
  IDENTIFIER,
  KEYWORD,
  isIdentifier,
  readIdentifier
};

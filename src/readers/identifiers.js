const {readWhile} = require('./utils/while.js');

const IDENTIFIER = Symbol.for('IDENTIFIER');

const isIdentifier = char => /[a-zA-Z_$]/.test(char);
const isValidIdentifier = char => /[a-zA-Z0-9_$\-]/.test(char);

const readIdentifier = input => ({
  type: IDENTIFIER,
  value: readWhile(input, isValidIdentifier)
});

module.exports = {
  isIdentifier,
  readIdentifier
};

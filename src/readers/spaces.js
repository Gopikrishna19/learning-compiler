const {isOneOf} = require('./utils/is.js');
const {readWhile} = require('./utils/while');

const NEWLINES = new Set([
  '\n'
]);

const SPACES = new Set([
  ' ',
  '\t',
  ...NEWLINES
]);

const isSpace = char => isOneOf(char, SPACES);
const readSpaces = input => readWhile(input, isSpace);

module.exports = {
  NEWLINES,
  readSpaces
};

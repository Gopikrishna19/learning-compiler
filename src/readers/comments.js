const {NEWLINES} = require('./spaces.js');
const {isOneOf} = require('./utils/is.js');
const {readWhile} = require('./utils/while');

const COMMENTS = new Set(['#']);

const isComment = char => isOneOf(char, COMMENTS);
const isNotNewline = char => !isOneOf(char, NEWLINES);

const readComment = input => {

  readWhile(input, isNotNewline);

  input.next();

};

module.exports = {
  isComment,
  readComment
};

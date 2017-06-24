const {NEWLINES} = require('./spaces');
const {isOneOf} = require('./utils/is');
const {readWhile} = require('./utils/while');

const COMMENTS = new Set(['#']);

const isComment = char => isOneOf(char, COMMENTS);
const isNotNewline = char => !isOneOf(char, NEWLINES);

const readComment = input => {

  readWhile(input, isNotNewline);

  return null;

};

module.exports = {
  isComment,
  readComment
};

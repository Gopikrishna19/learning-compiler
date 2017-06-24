const {NEWLINES} = require('./spaces.js');
const {isOneOf} = require('./utils/is.js');
const {readWhile} = require('./utils/while');

const COMMENTS = new Set(['#']);

const isNotNewline = char => !isOneOf(char, NEWLINES);

const readComments = input => {

  readWhile(input, isNotNewline);

  input.next();

};

module.exports = {
  COMMENTS,
  readComments
};

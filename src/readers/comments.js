const {NEWLINES} = require('./spaces.js');
const {isOneOf} = require('./is.js');
const {readWhile} = require('./while');

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

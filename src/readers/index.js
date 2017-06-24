const {isComment, readComment} = require('./comments');
const {isIdentifier, readIdentifier} = require('./identifiers');
const {isNumber, readNumber} = require('./numbers');
const {isOperator, readOperator} = require('./operators');
const {isString, readString} = require('./strings');
const {isSymbol, readSymbol} = require('./symbols');

module.exports = {
  readers: [
    {
      check: isComment,
      read: readComment
    },
    {
      check: isString,
      read: readString
    },
    {
      check: isNumber,
      read: readNumber
    },
    {
      check: isIdentifier,
      read: readIdentifier
    },
    {
      check: isSymbol,
      read: readSymbol
    },
    {
      check: isOperator,
      read: readOperator
    }
  ]
};

const {readProgram} = require('./parsers/program.js');

class ParseStream {

  constructor(tokens) {

    this.tokens = tokens;

  }

  parse() {

    return readProgram(this.tokens);

  }

}

module.exports = {
  ParseStream
};

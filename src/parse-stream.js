const {readProgram} = require('./parsers/program.js');

class ParseStream {

  constructor(input) {

    this.input = input;

  }

  parse() {

    return readProgram(this.input);

  }

}

module.exports = {
  ParseStream
};

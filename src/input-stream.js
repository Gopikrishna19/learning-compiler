class InputStream {

  constructor(input) {

    this.column = 0;
    this.input = input;
    this.position = 0;
    this.row = 1;

  }

  next() {

    const char = this.input.charAt(this.position);

    if (char === '\n') {

      this.row += 1;
      this.column = 0;

    } else {

      this.column += 1;

    }

    this.position += 1;

    return char;

  }

}

module.exports = {
  InputStream
};

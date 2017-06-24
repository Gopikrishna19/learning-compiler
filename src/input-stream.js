class InputStream {

  constructor(input) {

    this.column = 0;
    this.input = input;
    this.position = 0;
    this.row = 1;

  }

  next() {

    const char = this.peek();

    if (char === '\n') {

      this.row += 1;
      this.column = 0;

    } else {

      this.column += 1;

    }

    this.position += 1;

    return char;

  }

  peek() {

    return this.input.charAt(this.position);

  }

}

module.exports = {
  InputStream
};

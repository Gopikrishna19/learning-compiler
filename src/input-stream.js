class InputStream {

  get EOF() {

    return this.peek() === '';

  }

  constructor(expression) {

    this.column = 0;
    this.expression = expression;
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

    return this.expression.charAt(this.position);

  }

}

module.exports = {
  InputStream
};

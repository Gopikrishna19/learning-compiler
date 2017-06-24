class Tokens {

  static get COMMENT() {

    return new Set(['#']);

  }

  static get SPACES() {

    return new Set([
      ' ',
      '\n',
      '\t'
    ]);

  }

}

module.exports = {
  Tokens
};

class Tokens {

  static get COMMENT() {

    return new Set(['#']);

  }

  static get NEWLINE() {

    return new Set(['\n']);

  }

  static get SPACES() {

    return new Set([
      ' ',
      '\t',
      ...Tokens.NEWLINE
    ]);

  }

}

module.exports = {
  Tokens
};

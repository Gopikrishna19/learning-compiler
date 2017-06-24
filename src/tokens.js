class Tokens {

  static get COMMENTS() {

    return new Set(['#']);

  }

  static get ESCAPES() {

    return {
      '"': '"',
      '\'': '\'',
      '`': '`',
      'f': '\f',
      'n': '\n',
      'r': '\r',
      't': '\t',
      'v': '\v'
    };

  }

  static get NEWLINES() {

    return new Set(['\n']);

  }

  static get QUOTES() {

    return new Set([
      '\'',
      '\"',
      '\`'
    ]);

  }

  static get SPACES() {

    return new Set([
      ' ',
      '\t',
      ...Tokens.NEWLINES
    ]);

  }

}

module.exports = {
  Tokens
};

const peek = (tokens, ...matches) => {

  const token = tokens.peek();

  if (token) {

    const match = matches.reduce((condition, target) => condition || target === token.value, false);

    if (match) {

      return token;

    }

  }

  return null;

};

module.exports = {
  peek
};

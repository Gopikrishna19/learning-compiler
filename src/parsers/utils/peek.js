const peek = (tokens, matches) => {

  const token = tokens.peek();

  return token && matches.has(token.value) ? token : null;

};

module.exports = {
  peek
};

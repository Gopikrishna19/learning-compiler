const readWhile = (input, predicate) => {

  let sequence = '';

  while (!input.EOF && predicate(input.peek())) {

    sequence += input.next();

  }

  return sequence;

};

module.exports = {
  readWhile
};

class InputError extends Error {

  constructor(message, input) {

    super(`${message} (${input.row}:${input.column})`);

  }

}

module.exports = {
  InputError
};

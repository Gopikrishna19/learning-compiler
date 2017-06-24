const {expect} = require('code');
const {InputStream} = require('../src/input-stream');

describe('Input Stream', () => {

  let stream;

  beforeEach(() => stream = new InputStream());

  it('should be initialized and used as an object', () => {

    expect(stream).object();

  });

  it('should have initial configurations', () => {

    expect(stream).includes({
      column: 0,
      line: 1,
      position: 0
    });

  });

});

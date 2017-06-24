const {InputStream} = require('../src/input-stream.js');
const {TokenStream} = require('../src/token-stream');
const {expect} = require('code');

describe('Token Stream', () => {

  const createStream = input => new TokenStream(new InputStream(input));

  describe('initialization', () => {

    let input,
      stream;

    beforeEach(() => {

      input = new InputStream('');
      stream = new TokenStream(input);

    });

    it('should be initialized and used as an object', () => {

      expect(stream).to.be.object();

    });

    it('should have initial configurations', () => {

      expect(stream).to.include({
        current: null,
        input
      });

    });

  });

  it('should return null if end of stream', () => {

    const stream = createStream('');

    expect(stream.next()).to.be.null();

  });

  it('should fail on unexpected characters', () => {

    const stream = createStream('blah');

    expect(() => stream.next()).to.throw(Error, 'Unexpected character: b (1:0)');

  });

  it('should skip comments', () => {

    const stream = createStream('# comment');

    expect(stream.next()).to.be.null();

  });

  it('should skip white spaces', () => {

    const stream = createStream('  \n \t');

    expect(stream.next()).to.be.null();

  });

});

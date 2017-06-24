const {InputStream} = require('../src/input-stream.js');
const {TokenStream} = require('../src/token-stream');
const {expect} = require('code');

describe('Token Stream', () => {

  const createStream = input => new TokenStream(new InputStream(input));

  describe('initialization', () => {

    let stream;

    beforeEach(() => stream = new TokenStream());

    it('should be initialized and used as an object', () => {

      expect(stream).to.be.object();

    });

    it('should have initial configurations', () => {

      expect(stream).to.include({current: null});

    });

  });

  it('should return null if end of stream', () => {

    const stream = createStream('');

    expect(stream.next()).to.be.null();

  });

});

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

    expect(createStream('').next()).to.be.null();

  });

  it('should fail on unexpected characters', () => {

    expect(() => createStream('blah').next()).to.throw(Error, 'Unexpected character: b (1:0)');

  });

  it('should skip comments', () => {

    expect(createStream('# comment').next()).to.be.null();

  });

  it('should skip white spaces', () => {

    expect(createStream('  \n \t').next()).to.be.null();

  });

  it('should parse strings', () => {

    expect(createStream('\'single quotes\'').next()).to.equal({
      type: Symbol.for('STRING'),
      value: 'single quotes'
    });

    expect(createStream('"double quotes"').next()).to.equal({
      type: Symbol.for('STRING'),
      value: 'double quotes'
    });

    expect(createStream('`ticks`').next()).to.equal({
      type: Symbol.for('STRING'),
      value: 'ticks'
    });

  });

  it('should parse escaped strings', () => {

    expect(createStream('"a\\\"\\t\\v\\f\\\``\\\'\'\\n\\r\\eb"').next()).equals({
      type: Symbol.for('STRING'),
      value: 'a\"\t\v\f\``\'\'\n\reb'
    });

  });

  it('should fail on incomplete strings', () => {

    expect(() => createStream('"test').next()).to.throw(Error, 'Unexpected end of input: "test (1:5)');

  });

  it('should parse integers', () => {

    expect(createStream('123').next()).equals({
      type: Symbol.for('NUMBER'),
      value: 123
    });

  });

  it('should parse floating number', () => {

    expect(createStream('123.456').next()).equals({
      type: Symbol.for('NUMBER'),
      value: 123.456
    });

  });

  it('should return NaN for invalid numbers', () => {

    expect(createStream('123.456.768').next()).equals({
      type: Symbol.for('NUMBER'),
      value: NaN
    });

  });

});

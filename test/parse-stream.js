const {InputStream} = require('../src/input-stream');
const {ParseStream} = require('../src/parse-stream');
const {TokenStream} = require('../src/token-stream');
const {expect} = require('code');

describe('Parse Stream', () => {

  const PROGRAM = Symbol.for('PROGRAM');
  const createStream = input => new ParseStream(new TokenStream(new InputStream(input)));

  describe('initialization', () => {

    let input,
      stream;

    beforeEach(() => {

      input = new TokenStream(new InputStream(''));
      stream = new ParseStream(input);

    });

    it('should be initialized and used as an object', () => {

      expect(stream).to.be.object();

    });

    it('should have initial configurations', () => {

      expect(stream).to.include({
        input
      });

    });

  });

  describe('when parsing', () => {

    it('should return empty program if end of stream', () => {

      expect(createStream('').parse()).to.equal({
        program: [],
        type: PROGRAM
      });

    });

    it('should fail on unexpected token', () => {

      expect(() => createStream('=').parse()).to.throw(Error, 'Unexpected token: {"value":"="} (1:1)');

    });

    it('should parse integers', () => {

      expect(createStream('123').parse()).to.equal({
        program: [{
          type: Symbol.for('NUMBER'),
          value: 123
        }],
        type: PROGRAM
      });

    });

    it('should parse floating numbers', () => {

      expect(createStream('123.12').parse()).to.equal({
        program: [{
          type: Symbol.for('NUMBER'),
          value: 123.12
        }],
        type: PROGRAM
      });

    });

    it('should parse strings', () => {

      expect(createStream('"test"').parse()).to.equal({
        program: [{
          type: Symbol.for('STRING'),
          value: 'test'
        }],
        type: PROGRAM
      });

    });

  });

});

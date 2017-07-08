const {InputStream} = require('../src/input-stream');
const {ParseStream} = require('../src/parse-stream');
const {TokenStream} = require('../src/token-stream');
const {expect} = require('code');

describe('Parse Stream', () => {

  const PROGRAM = Symbol.for('PROGRAM');
  const createStream = input => new ParseStream(new TokenStream(new InputStream(input)));

  describe('initialization', () => {

    let tokens,
      stream;

    beforeEach(() => {

      tokens = new TokenStream(new InputStream(''));
      stream = new ParseStream(tokens);

    });

    it('should be initialized and used as an object', () => {

      expect(stream).to.be.object();

    });

    it('should have initial configurations', () => {

      expect(stream).to.include({
        tokens
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
        program: [
          {
            type: Symbol.for('NUMBER'),
            value: 123
          }
        ],
        type: PROGRAM
      });

    });

    it('should parse floating numbers', () => {

      expect(createStream('123.12').parse()).to.equal({
        program: [
          {
            type: Symbol.for('NUMBER'),
            value: 123.12
          }
        ],
        type: PROGRAM
      });

    });

    it('should parse strings', () => {

      expect(createStream('"test"').parse()).to.equal({
        program: [
          {
            type: Symbol.for('STRING'),
            value: 'test'
          }
        ],
        type: PROGRAM
      });

    });

    it('should parse identifiers', () => {

      expect(createStream('a').parse()).to.equal({
        program: [
          {
            type: Symbol.for('IDENTIFIER'),
            value: 'a'
          }
        ],
        type: PROGRAM
      });

    });

    it('should parse booleans', () => {

      expect(createStream('true').parse()).to.equal({
        program: [
          {
            type: Symbol.for('BOOLEAN'),
            value: true
          }
        ],
        type: PROGRAM
      });

      expect(createStream('false').parse()).to.equal({
        program: [
          {
            type: Symbol.for('BOOLEAN'),
            value: false
          }
        ],
        type: PROGRAM
      });

    });

    it('should parse assignments', () => {

      expect(createStream('a = 1').parse()).to.equal({
        program: [
          {
            left: {
              type: Symbol.for('IDENTIFIER'),
              value: 'a'
            },
            right: {
              type: Symbol.for('NUMBER'),
              value: 1
            },
            type: Symbol.for('ASSIGN')
          }
        ],
        type: PROGRAM
      });

    });

  });

});

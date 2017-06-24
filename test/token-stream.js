const {InputStream} = require('../src/input-stream');
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
        input
      });

    });

  });

  describe('when reading next token', () => {

    it('should return null if end of stream', () => {

      expect(createStream('').next()).to.be.null();

    });

    it('should fail on unexpected characters', () => {

      expect(() => createStream('^&').next()).to.throw(Error, 'Unexpected character: ^ (1:0)');

    });

    it('should skip comments', () => {

      expect(createStream('# comment').next()).to.be.null();

    });

    it('should skip white spaces', () => {

      expect(createStream('  \n \t').next()).to.be.null();

    });

    it('should read strings', () => {

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

    it('should read escaped strings', () => {

      expect(createStream('"a\\\"\\t\\v\\f\\\``\\\'\'\\n\\r\\eb"').next()).equals({
        type: Symbol.for('STRING'),
        value: 'a\"\t\v\f\``\'\'\n\reb'
      });

    });

    it('should fail on incomplete strings', () => {

      expect(() => createStream('"test').next()).to.throw(Error, 'Unexpected end of input: "test (1:5)');

    });

    it('should read integers', () => {

      expect(createStream('123').next()).equals({
        type: Symbol.for('NUMBER'),
        value: 123
      });

    });

    it('should read floating number', () => {

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

    it('should read identifiers', () => {

      [
        'abc',
        'abc-def',
        'abcDef',
        'abc_def',
        'abc123$',
        '_abc',
        '_abc',
        'AbcDef'
      ].forEach(identifier =>
        expect(createStream(identifier).next()).equals({
          type: Symbol.for('IDENTIFIER'),
          value: identifier
        })
      );

    });

    it('should read keywords', () => {

      [
        'if',
        'then',
        'else',
        'lambda',
        'true',
        'false'
      ].forEach(identifier =>
        expect(createStream(identifier).next()).equals({
          type: Symbol.for('KEYWORD'),
          value: identifier
        })
      );

    });

    it('should read symbols', () => {

      [
        '(',
        ')',
        '{',
        '}',
        '[',
        ']',
        ',',
        ';',
        '.'
      ].forEach(symbol =>
        expect(createStream(symbol).next()).equals({
          type: Symbol.for('SYMBOL'),
          value: symbol
        })
      );

    });

    it('should read operators', () => {

      [
        '+',
        '-',
        '*',
        '/',
        '%',
        '=',
        '&',
        '|',
        '<',
        '>',
        '<=',
        '>=',
        '==',
        '!='
      ].forEach(symbol =>
        expect(createStream(symbol).next()).equals({
          type: Symbol.for('OPERATOR'),
          value: symbol
        })
      );

    });

  });

  describe('when peeking at the next token', () => {

    it('should not read next token if already peeked', () => {

      const stream = createStream('a = 1');
      const expectedToken = {
        type: Symbol.for('IDENTIFIER'),
        value: 'a'
      };

      expect(stream.peek()).to.equal(expectedToken);
      expect(stream.next()).to.equal(expectedToken);

    });

  });

  describe('when checking for EOF', () => {

    it('should return true if it is end of stream', () => {

      expect(createStream('').EOF).to.be.true();

    });

    it('should return false if it is not the end of stream', () => {

      expect(createStream('a').EOF).to.be.false();

    });

  });

});

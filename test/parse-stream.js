const {InputStream} = require('../src/input-stream');
const {ParseStream} = require('../src/parse-stream');
const {TokenStream} = require('../src/token-stream');
const {expect} = require('code');

describe('Parse Stream', () => {

  const PROGRAM = Symbol.for('PROGRAM');
  const createStream = input => new ParseStream(new TokenStream(new InputStream(input)));
  const parse = input => createStream(input).parse();

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

      expect(parse('')).to.equal({
        program: [],
        type: PROGRAM
      });

    });

    it('should fail on unexpected token', () => {

      expect(() => parse('=')).to.throw(Error, 'Unexpected token: {"value":"="} (1:1)');

    });

    it('should fail on missing keyword', () => {

      expect(() => parse('if a == 1 b')).to.throw(Error, 'Expected token: ["then"] (1:11)');

    });

    it('should parse integers', () => {

      expect(parse('123')).to.equal({
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

      expect(parse('123.12')).to.equal({
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

      expect(parse('"test"')).to.equal({
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

      expect(parse('a')).to.equal({
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

      expect(parse('true')).to.equal({
        program: [
          {
            type: Symbol.for('BOOLEAN'),
            value: true
          }
        ],
        type: PROGRAM
      });

      expect(parse('false')).to.equal({
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

      expect(parse('a = 1')).to.equal({
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

    it('should parse binary expressions', () => {

      expect(parse('a = 1 * 2')).to.equal({
        program: [
          {
            left: {
              type: Symbol.for('IDENTIFIER'),
              value: 'a'
            },
            right: {
              left: {
                type: Symbol.for('NUMBER'),
                value: 1
              },
              operator: '*',
              right: {
                type: Symbol.for('NUMBER'),
                value: 2
              },
              type: Symbol.for('BINARY')
            },
            type: Symbol.for('ASSIGN')
          }
        ],
        type: PROGRAM
      });

    });

    it('should parse complex binary expressions', () => {

      expect(parse('a = 1 + 2 - 3')).to.equal({
        program: [
          {
            left: {
              type: Symbol.for('IDENTIFIER'),
              value: 'a'
            },
            right: {
              left: {
                left: {
                  type: Symbol.for('NUMBER'),
                  value: 1
                },
                operator: '+',
                right: {
                  type: Symbol.for('NUMBER'),
                  value: 2
                },
                type: Symbol.for('BINARY')
              },
              operator: '-',
              right: {
                type: Symbol.for('NUMBER'),
                value: 3
              },
              type: Symbol.for('BINARY')
            },
            type: Symbol.for('ASSIGN')
          }
        ],
        type: PROGRAM
      });

    });

    it('should parse binary expressions with precedence', () => {

      expect(parse('a = 1 % 2 - 3 / 4')).to.equal({
        program: [
          {
            left: {
              type: Symbol.for('IDENTIFIER'),
              value: 'a'
            },
            right: {
              left: {
                left: {
                  type: Symbol.for('NUMBER'),
                  value: 1
                },
                operator: '%',
                right: {
                  type: Symbol.for('NUMBER'),
                  value: 2
                },
                type: Symbol.for('BINARY')
              },
              operator: '-',
              right: {
                left: {
                  type: Symbol.for('NUMBER'),
                  value: 3
                },
                operator: '/',
                right: {
                  type: Symbol.for('NUMBER'),
                  value: 4
                },
                type: Symbol.for('BINARY')
              },
              type: Symbol.for('BINARY')
            },
            type: Symbol.for('ASSIGN')
          }
        ],
        type: PROGRAM
      });

    });

    it('should parse unary expressions', () => {

      expect(parse('-a & !b')).to.equal({
        program: [
          {
            left: {
              operator: '-',
              right: {
                type: Symbol.for('IDENTIFIER'),
                value: 'a'
              },
              type: Symbol.for('UNARY')
            },
            operator: '&',
            right: {
              operator: '!',
              right: {
                type: Symbol.for('IDENTIFIER'),
                value: 'b'
              },
              type: Symbol.for('UNARY')
            },
            type: Symbol.for('BINARY')
          }
        ],
        type: PROGRAM
      });

    });

    it('should parse simple if-then-else statements', () => {

      expect(parse('if a == 1 then b else c')).to.equal({
        program: [
          {
            condition: {
              left: {
                type: Symbol.for('IDENTIFIER'),
                value: 'a'
              },
              operator: '==',
              right: {
                type: Symbol.for('NUMBER'),
                value: 1
              },
              type: Symbol.for('BINARY')
            },
            elsePart: {
              type: Symbol.for('IDENTIFIER'),
              value: 'c'
            },
            thenPart: {
              type: Symbol.for('IDENTIFIER'),
              value: 'b'
            },
            type: Symbol.for('CONDITION')
          }
        ],
        type: PROGRAM
      });

    });

    it('should parse simple if-then statements', () => {

      expect(parse('if a == 1 then b')).to.equal({
        program: [
          {
            condition: {
              left: {
                type: Symbol.for('IDENTIFIER'),
                value: 'a'
              },
              operator: '==',
              right: {
                type: Symbol.for('NUMBER'),
                value: 1
              },
              type: Symbol.for('BINARY')
            },
            thenPart: {
              type: Symbol.for('IDENTIFIER'),
              value: 'b'
            },
            type: Symbol.for('CONDITION')
          }
        ],
        type: PROGRAM
      });

    });

    it('should parse complex if-then-else statements', () => {

      expect(parse(`
        if a == 1 {
          b = 2;
        }
      `)).to.equal({
        program: [
          {
            condition: {
              left: {
                type: Symbol.for('IDENTIFIER'),
                value: 'a'
              },
              operator: '==',
              right: {
                type: Symbol.for('NUMBER'),
                value: 1
              },
              type: Symbol.for('BINARY')
            },
            thenPart: {
              left: {
                type: Symbol.for('IDENTIFIER'),
                value: 'b'
              },
              right: {
                type: Symbol.for('NUMBER'),
                value: 2
              },
              type: Symbol.for('ASSIGN')
            },
            type: Symbol.for('CONDITION')
          }
        ],
        type: PROGRAM
      });

      expect(parse(`
        if a == 1 {
          b = 2
          c = 3;
        }
      `)).to.equal({
        program: [
          {
            condition: {
              left: {
                type: Symbol.for('IDENTIFIER'),
                value: 'a'
              },
              operator: '==',
              right: {
                type: Symbol.for('NUMBER'),
                value: 1
              },
              type: Symbol.for('BINARY')
            },
            thenPart: {
              program: [
                {
                  left: {
                    type: Symbol.for('IDENTIFIER'),
                    value: 'b'
                  },
                  right: {
                    type: Symbol.for('NUMBER'),
                    value: 2
                  },
                  type: Symbol.for('ASSIGN')
                },
                {
                  left: {
                    type: Symbol.for('IDENTIFIER'),
                    value: 'c'
                  },
                  right: {
                    type: Symbol.for('NUMBER'),
                    value: 3
                  },
                  type: Symbol.for('ASSIGN')
                }
              ],
              type: PROGRAM
            },
            type: Symbol.for('CONDITION')
          }
        ],
        type: PROGRAM
      });

    });

    it('should parse multiple statements', () => {

      expect(parse(`
        a = 1;
        b = 2;
      `)).to.equal({
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
          },
          {
            left: {
              type: Symbol.for('IDENTIFIER'),
              value: 'b'
            },
            right: {
              type: Symbol.for('NUMBER'),
              value: 2
            },
            type: Symbol.for('ASSIGN')
          }
        ],
        type: PROGRAM
      });

    });

    it('should parse lambda expressions', () => {

      expect(parse(`
        f1 = lambda (a) a * a
        f2 = lambda (a, b) {
          a = 1
          b = 2
        }
        f3 = lambda () a
      `)).to.equal({
        program: [
          {
            left: {
              type: Symbol.for('IDENTIFIER'),
              value: 'f1'
            },
            right: {
              body: {
                left: {
                  type: Symbol.for('IDENTIFIER'),
                  value: 'a'
                },
                operator: '*',
                right: {
                  type: Symbol.for('IDENTIFIER'),
                  value: 'a'
                },
                type: Symbol.for('BINARY')
              },
              parameters: ['a'],
              type: Symbol.for('LAMBDA')
            },
            type: Symbol.for('ASSIGN')
          },
          {
            left: {
              type: Symbol.for('IDENTIFIER'),
              value: 'f2'
            },
            right: {
              body: {
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
                  },
                  {
                    left: {
                      type: Symbol.for('IDENTIFIER'),
                      value: 'b'
                    },
                    right: {
                      type: Symbol.for('NUMBER'),
                      value: 2
                    },
                    type: Symbol.for('ASSIGN')
                  }
                ],
                type: PROGRAM
              },
              parameters: ['a', 'b'],
              type: Symbol.for('LAMBDA')
            },
            type: Symbol.for('ASSIGN')
          },
          {
            left: {
              type: Symbol.for('IDENTIFIER'),
              value: 'f3'
            },
            right: {
              body: {
                type: Symbol.for('IDENTIFIER'),
                value: 'a'
              },
              parameters: [],
              type: Symbol.for('LAMBDA')
            },
            type: Symbol.for('ASSIGN')
          }
        ],
        type: PROGRAM
      });

    });

    it('should parse function calls', () => {

      expect(parse(`
        f1(a = 1, 2)
        f2()
      `)).to.equal({
        program: [
          {
            arguments: [
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
              },
              {
                type: Symbol.for('NUMBER'),
                value: 2
              }
            ],
            name: 'f1',
            type: Symbol.for('CALL')
          },
          {
            arguments: [],
            name: 'f2',
            type: Symbol.for('CALL')
          }
        ],
        type: PROGRAM
      });

    });

  });

});

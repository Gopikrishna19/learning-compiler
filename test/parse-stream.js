const {InputStream} = require('../src/input-stream');
const {ParseStream} = require('../src/parse-stream');
const {TokenStream} = require('../src/token-stream');
const {expect} = require('code');

describe('Parse Stream', () => {

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

});

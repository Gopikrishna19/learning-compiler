const {TokenStream} = require('../src/token-stream');
const {expect} = require('code');

describe('Token Stream', () => {

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

});

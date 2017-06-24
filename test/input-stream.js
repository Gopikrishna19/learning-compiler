const {expect} = require('code');
const {InputStream} = require('../src/input-stream');

describe('Input Stream', () => {

  describe('initialization', () => {

    let stream;

    beforeEach(() => stream = new InputStream());

    it('should be initialized and used as an object', () => {

      expect(stream).to.be.object();

    });

    it('should have initial configurations', () => {

      expect(stream).to.include({
        column: 0,
        position: 0,
        row: 1
      });

    });

  });

  describe('when reading next character', () => {

    describe('if next character is newline', () => {

      let nextChar,
        stream;

      beforeEach(() => {

        stream = new InputStream('\n');
        nextChar = stream.next();

      });

      it('should increment the row', () => {

        expect(stream.row).to.equal(2);

      });

      it('should reset the column', () => {

        expect(stream.column).to.equal(0);

      });

      it('should increment the position', () => {

        expect(stream.position).to.equal(1);

      });

      it('should return the next character', () => {

        expect(nextChar).to.equal('\n');

      });

    });

    describe('if next character is not a newline', () => {

      let nextChar,
        stream;

      beforeEach(() => {

        stream = new InputStream('a');
        nextChar = stream.next();

      });

      it('should stay in the same the row', () => {

        expect(stream.row).to.equal(1);

      });

      it('should increment the column', () => {

        expect(stream.column).to.equal(1);

      });

      it('should increment the position', () => {

        expect(stream.position).to.equal(1);

      });

      it('should return the next character', () => {

        expect(nextChar).to.equal('a');

      });

    });

  });

  describe('when peeking at the next character', () => {

    let nextChar,
      stream;

    beforeEach(() => {

      stream = new InputStream('a');
      nextChar = stream.peek();

    });

    it('should not update metrics', () => {

      expect(stream).to.include({
        column: 0,
        position: 0,
        row: 1
      });

    });

    it('should return the next character', () => {

      expect(nextChar).to.equal('a');

    });

  });

});

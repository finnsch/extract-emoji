import { expect } from 'chai';
import { all, isEmoji, extractEmoji } from './src/index';

describe('extract-emoji', () => {

  describe('all', () => {
    it.skip('should get all emoji', () => {
      expect(all).to.have.lengthOf(1556);
    });
  });

  describe('isEmoji', () => {
    it('should validate emoji', () => {
      expect(isEmoji('🆙')).to.be.equal(true);
    });

    it('should not validate standar char', () => {
      expect(isEmoji('a')).to.be.equal(false);
      expect(isEmoji('')).to.be.equal(false);
      expect(isEmoji(' ')).to.be.equal(false);
      expect(isEmoji('\n')).to.be.equal(false);
    });
  });

  describe('extractEmoji', () => {

    it('should return 1 emoji', () => {
      expect(extractEmoji('that was 5 😋 fun!')).to.be.deep.equal(['😋']);
    });

    it('should return multiple emoji', () => {
      expect(extractEmoji('😋t🆙 some text 😋 fun!🆙')).to.be.deep.equal(['😋', '🆙', '😋', '🆙']);
    });

  });

});

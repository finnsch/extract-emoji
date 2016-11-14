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

    it('should return 1 face emoji', () => {
      expect(extractEmoji('that was fun 😃!')).to.be.deep.equal(['😃']);
    });

    it('should return 1 flag emoji', () => {
      expect(extractEmoji('Lang lebe 🇩🇪!')).to.be.deep.equal(['🇩🇪']);
    });

    it('should return 2 emojis with skin tones', () => {
      expect(extractEmoji('🙎🏾 and 👱🏻 are friends')).to.be.deep.equal(['🙎🏾', '👱🏻']);
    });

    it('should return 1 heart emoji', () => {
      expect(extractEmoji('I ❤️ you!️')).to.be.deep.equal(['❤️']);
    });

    it('should return multiple emoji', () => {
      expect(extractEmoji('😋t🆙 some text 😋 fun!🆙')).to.be.deep.equal(['😋', '🆙', '😋', '🆙']);
    });

  });

});

import {
  findSubstringFromLastAtSign,
  findSubstringUntilLastAtSign,
} from './mentions.util';

describe('Mentions Util', () => {
  describe('findSubstringFromLastAtSign', () => {
    it('should return the whole string if no @ sign is present', () => {
      const result = findSubstringFromLastAtSign('no at sign here');

      expect(result).toEqual('no at sign here');
    });
    it('should return the substring from the @ sign to the end of the string', () => {
      const result = findSubstringFromLastAtSign('at sign @here');

      expect(result).toEqual('here');
    });
  });

  describe('findSubstringUntilLastAtSign', () => {
    it('should return the whole string if no @ sign is present', () => {
      const result = findSubstringUntilLastAtSign('no at sign here');

      expect(result).toEqual('no at sign here');
    });
    it('should return the substring from the beginning of the string to the last @ sign', () => {
      const result = findSubstringUntilLastAtSign('at sign @here');

      expect(result).toEqual('at sign @');
    });
  });
});

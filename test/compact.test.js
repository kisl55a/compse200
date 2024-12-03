import { expect } from "chai";
import compact from '../src/compact.js';

describe('compact', () => {
  describe('positive tests', () => {
    it('should remove all falsey values from the array', () => {
      const array = [0, 1, false, 2, '', 3, null, undefined, NaN];
      const result = compact(array);
      expect(result).to.deep.equal([1, 2, 3]);
    });

    it('should return the same array if there are no falsey values', () => {
      const array = [1, 2, 3];
      const result = compact(array);
      expect(result).to.deep.equal([1, 2, 3]);
    });

    it('should return an empty array if all values are falsey', () => {
      const array = [0, false, '', null, undefined, NaN];
      const result = compact(array);
      expect(result).to.deep.equal([]);
    });
  });

  describe('edge cases', () => {
    it('should handle an empty array', () => {
      const result = compact([]);
      expect(result).to.deep.equal([]);
    });

    it('should handle null input', () => {
      const result = compact(null);
      expect(result).to.deep.equal([]);
    });

    it('should handle undefined input', () => {
      const result = compact(undefined);
      expect(result).to.deep.equal([]);
    });

    it('should handle array with mixed truthy and falsey values', () => {
      const array = [0, 1, false, 2, '', 3, 'hello', null, undefined, NaN, true];
      const result = compact(array);
      expect(result).to.deep.equal([1, 2, 3, 'hello', true]);
    });

    it('should handle array with only one truthy value', () => {
      const array = [0, false, '', null, undefined, NaN, 1];
      const result = compact(array);
      expect(result).to.deep.equal([1]);
    });

    it('should handle array with only one falsey value', () => {
      const array = [0];
      const result = compact(array);
      expect(result).to.deep.equal([]);
    });

    it('should handle array with nested arrays', () => {
      const array = [0, [1, 2], false, [3, 4], '', null];
      const result = compact(array);
      expect(result).to.deep.equal([[1, 2], [3, 4]]);
    });

    it('should handle array with objects', () => {
      const array = [0, { a: 1 }, false, { b: 2 }, '', null];
      const result = compact(array);
      expect(result).to.deep.equal([{ a: 1 }, { b: 2 }]);
    });
  });
});
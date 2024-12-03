import { expect } from "chai";
import every from '../src/every.js';

describe('every', () => {
  describe('positive tests', () => {
    it('should return true if all elements pass the predicate check', () => {
      const array = [true, 1, 'yes'];
      const result = every(array, Boolean);
      expect(result).to.be.true;
    });

    it('should return false if any element fails the predicate check', () => {
      const array = [true, 1, null, 'yes'];
      const result = every(array, Boolean);
      expect(result).to.be.false;
    });

    it('should return true for an empty array', () => {
      const array = [];
      const result = every(array, Boolean);
      expect(result).to.be.true;
    });

    it('should pass index to predicate', () => {
      const array = [0, 1, 2, 3];
      const result = every(array, (val, index) => index < 4);
      expect(result).to.be.true;
    });
  });

  describe('edge cases', () => {
    it('should handle null input', () => {
      const result = every(null, Boolean);
      expect(result).to.be.true;
    });

    it('should handle undefined input', () => {
      const result = every(undefined, Boolean);
      expect(result).to.be.true;
    });

    it('should handle array with mixed types', () => {
      const array = [1, 'a', true, {}, []];
      const result = every(array, val => typeof val !== 'undefined');
      expect(result).to.be.true;
    });

    it('should handle array with nested arrays', () => {
      const array = [[1, 2], [3, 4]];
      const result = every(array, Array.isArray);
      expect(result).to.be.true;
    });

    it('should handle array with objects', () => {
      const array = [{ a: 1 }, { b: 2 }];
      const result = every(array, val => typeof val === 'object');
      expect(result).to.be.true;
    });

    it('should handle array with functions', () => {
      const array = [() => 1, () => 2];
      const result = every(array, val => typeof val === 'function');
      expect(result).to.be.true;
    });

    it('should return false if any element fails the predicate check with mixed types', () => {
      const array = [1, 'a', false, {}, []];
      const result = every(array, val => typeof val === 'number');
      expect(result).to.be.false;
    });
  });
});
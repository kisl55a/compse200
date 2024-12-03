import { expect } from "chai";
import filter from '../src/filter.js';

describe('filter', () => {
  describe('positive tests', () => {
    it('should return filtered array based on predicate', () => {
      const users = [
        { 'user': 'barney', 'active': true },
        { 'user': 'fred', 'active': false }
      ];
      const result = filter(users, ({ active }) => active);
      expect(result).to.deep.equal([{ 'user': 'barney', 'active': true }]);
    });

    it('should filter numbers based on condition', () => {
      const numbers = [1, 2, 3, 4, 5, 6];
      const result = filter(numbers, num => num % 2 === 0);
      expect(result).to.deep.equal([2, 4, 6]);
    });

    it('should pass index to predicate', () => {
      const arr = ['a', 'b', 'c'];
      const result = filter(arr, (val, index) => index < 2);
      expect(result).to.deep.equal(['a', 'b']);
    });
  });

  describe('edge cases', () => {
    it('should handle empty array', () => {
      const result = filter([], x => x > 0);
      expect(result).to.deep.equal([[]]);
    });

    it('should handle null input', () => {
      const result = filter(null, x => x > 0);
      expect(result).to.deep.equal([[]]);
    });

    it('should handle array with all elements filtered out', () => {
      const numbers = [1, 3, 5, 7];
      const result = filter(numbers, num => num % 2 === 0);
      expect(result).to.deep.equal([[]]);
    });

    it('should handle array with mixed types', () => {
      const mixed = [1, 'a', false, null, undefined, {}, [], NaN];
      const result = filter(mixed, val => typeof val === 'number');
      expect(result).to.deep.equal([1, NaN]);
    });

    it('should handle array with nested arrays', () => {
      const nested = [1, [2, 3], 4, [5, 6]];
      const result = filter(nested, Array.isArray);
      expect(result).to.deep.equal([[2, 3], [5, 6]]);
    });

    it('should handle array with objects', () => {
      const objects = [{ a: 1 }, { b: 2 }, 3, 4];
      const result = filter(objects, val => typeof val === 'object');
      expect(result).to.deep.equal([{ a: 1 }, { b: 2 }]);
    });

    it('should handle array with functions', () => {
      const functions = [() => 1, () => 2, 3, 4];
      const result = filter(functions, val => typeof val === 'function');
      expect(result).to.deep.equal([() => 1, () => 2]);
    });
  });
});
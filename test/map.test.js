import { expect } from 'chai';
import map from '../src/map.js';

describe('map', () => {
  it('should map an array of numbers with a function that squares each number', () => {
    const array = [1, 2, 3, 4];
    const iteratee = (n) => n * n;
    const result = map(array, iteratee);
    expect(result).to.deep.equal([1, 4, 9, 16]);
  });
});
import { expect } from "chai";
import memoize from '../src/memoize.js';

describe('memoize', () => {
  describe('positive tests', () => {
    it('should memoize the result of a function', () => {
      const func = (x) => x * 2;
      const memoizedFunc = memoize(func);
      expect(memoizedFunc(2)).to.equal(4);
      expect(memoizedFunc(2)).to.equal(4); // Cached result
    });

    it('should use resolver to determine cache key', () => {
      const func = (x, y) => x + y;
      const resolver = (x, y) => `${x}-${y}`;
      const memoizedFunc = memoize(func, resolver);
      expect(memoizedFunc(1, 2)).to.equal(3);
      expect(memoizedFunc(1, 2)).to.equal(3); // Cached result
    });

    it('should replace memoize.Cache with WeakMap', () => {
      memoize.Cache = WeakMap;
      const func = (x) => x * 2;
      const memoizedFunc = memoize(func);
      const obj = {};
      expect(memoizedFunc(obj)).to.equal(NaN); // WeakMap keys must be objects
      expect(memoizedFunc.cache).to.be.instanceOf(WeakMap);
      memoize.Cache = Map; // Reset to default
    });
  });

  describe('edge cases', () => {
    it('should throw an error if func is not a function', () => {
      expect(() => memoize(null)).to.throw(TypeError, 'Expected a function');
    });

    it('should throw an error if resolver is not a function', () => {
      const func = (x) => x * 2;
      expect(() => memoize(func, null)).to.not.throw();
      expect(() => memoize(func, 'not a function')).to.throw(TypeError, 'Expected a function');
    });

    it('should handle multiple arguments correctly', () => {
      const func = (x, y) => x + y;
      const memoizedFunc = memoize(func);
      expect(memoizedFunc(1, 2)).to.equal(3);
      expect(memoizedFunc(1, 2)).to.equal(3); // Cached result
      expect(memoizedFunc(2, 3)).to.equal(5);
    });

    it('should handle complex objects as arguments', () => {
      const func = (obj) => obj.value * 2;
      const memoizedFunc = memoize(func);
      const obj = { value: 2 };
      expect(memoizedFunc(obj)).to.equal(4);
      expect(memoizedFunc(obj)).to.equal(4); // Cached result
    });

    it('should handle cache eviction correctly', () => {
      const func = (x) => x * 2;
      const memoizedFunc = memoize(func);
      memoizedFunc.cache.set(1, 2);
      expect(memoizedFunc(1)).to.equal(2); // Cached result
      memoizedFunc.cache.delete(1);
      expect(memoizedFunc(1)).to.equal(2); // Recomputed result
    });

    it('should handle undefined and null as cache keys', () => {
      const func = (x) => x == null ? 'nullish' : x * 2;
      const memoizedFunc = memoize(func);
      expect(memoizedFunc(undefined)).to.equal('nullish');
      expect(memoizedFunc(null)).to.equal('nullish');
      expect(memoizedFunc(2)).to.equal(4);
    });
  });
});
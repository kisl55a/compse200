import { expect } from 'chai';
import clamp from '../src/clamp.js';

describe('clamp', () => {
  describe('positive tests', () => {
    it('should clamp a number within the inclusive lower and upper bounds', () => {
      expect(clamp(-10, -5, 5)).to.equal(-5, 'clamp(-10, -5, 5) should return -5');
      expect(clamp(10, -5, 5)).to.equal(5, 'clamp(10, -5, 5) should return 5');
      expect(clamp(0, -5, 5)).to.equal(0, 'clamp(0, -5, 5) should return 0');
      expect(clamp(-5, -5, 5)).to.equal(-5, 'clamp(-5, -5, 5) should return -5');
      expect(clamp(5, -5, 5)).to.equal(5, 'clamp(5, -5, 5) should return 5');
    });

    it('should handle edge cases', () => {
      expect(clamp(Number.MAX_SAFE_INTEGER, -5, 5)).to.equal(5, 'clamp(MAX_SAFE_INTEGER, -5, 5) should return 5');
      expect(clamp(Number.MIN_SAFE_INTEGER, -5, 5)).to.equal(-5, 'clamp(MIN_SAFE_INTEGER, -5, 5) should return -5');
      expect(clamp(Infinity, -5, 5)).to.equal(5, 'clamp(Infinity, -5, 5) should return 5');
      expect(clamp(-Infinity, -5, 5)).to.equal(-5, 'clamp(-Infinity, -5, 5) should return -5');
    });
  });

  describe('negative tests', () => {
    it('Invalid number inputs', () => {
      expect(clamp(10, NaN, 5)).to.equal(0, 'clamp(10, NaN, 5) should return 0');
      expect(clamp(10, -5, NaN)).to.equal(0, 'clamp(10, -5, NaN) should return 0');
      expect(clamp(NaN, NaN, NaN)).to.equal(0, 'clamp(NaN, NaN, NaN) should return 0');
    });
  });
});
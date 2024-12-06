import { expect } from "chai";
import eq from '../src/eq.js';

describe('eq', () => {
  describe('positive tests', () => {
    it('should return true for identical objects', () => {
      const object = { 'a': 1 };
      expect(eq(object, object)).to.be.true;
    });

    it('should return false for different objects with same properties', () => {
      const object = { 'a': 1 };
      const other = { 'a': 1 };
      expect(eq(object, other)).to.be.false;
    });

    it('should return true for identical strings', () => {
      expect(eq('a', 'a')).to.be.true;
    });

    it('should return false for string and object with same value', () => {
      expect(eq('a', Object('a'))).to.be.false;
    });

    it('should return true for NaN compared to NaN', () => {
      expect(eq(NaN, NaN)).to.be.true;
    });
  });

  describe('edge cases', () => {
    it('should return true for null compared to null', () => {
      expect(eq(null, null)).to.be.true;
    });

    it('should return true for undefined compared to undefined', () => {
      expect(eq(undefined, undefined)).to.be.true;
    });

    it('should return false for number compared to string with same value', () => {
      expect(eq(1, '1')).to.be.false;
    });

    it('should return false for boolean compared to number with same value', () => {
      expect(eq(true, 1)).to.be.false;
    });

    it('should return false for boolean compared to string with same value', () => {
      expect(eq(true, 'true')).to.be.false;
    });
  });
});
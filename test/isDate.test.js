import { expect } from "chai";
import isDate from "../src/isDate.js";

describe("isDate", () => {
  describe("positive tests", () => {
    it("should return true for a Date object", () => {
      const result = isDate(new Date());
      expect(result).to.be.true;
    });

    it("should return true for a Date object created with a specific date", () => {
      const result = isDate(new Date("2023-01-01"));
      expect(result).to.be.true;
    });
  });

  describe("negative tests", () => {
    it("should return false for a string representing a date", () => {
      const result = isDate("Mon April 23 2012");
      expect(result).to.be.false;
    });

    it("should return false for a number", () => {
      const result = isDate(1234567890);
      expect(result).to.be.false;
    });

    it("should return false for an object", () => {
      const result = isDate({ year: 2023, month: 1, day: 1 });
      expect(result).to.be.false;
    });

    it("should return false for an array", () => {
      const result = isDate([2023, 1, 1]);
      expect(result).to.be.false;
    });

    it("should return false for null", () => {
      const result = isDate(null);
      expect(result).to.be.false;
    });

    it("should return false for undefined", () => {
      const result = isDate(undefined);
      expect(result).to.be.false;
    });

    it("should return false for a boolean", () => {
      const result = isDate(true);
      expect(result).to.be.false;
    });

    it("should return false for a function", () => {
      const result = isDate(() => {});
      expect(result).to.be.false;
    });
  });
});
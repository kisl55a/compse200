import { expect } from "chai";
import add from "../src/add.js";

describe("add", () => {
  describe("positive tests", () => {
    describe("numbers", () => {
      it("should handle various number additions", () => {
        expect(add(6, 4)).to.equal(10, "6 + 4 should equal 10");
        expect(add(-6, -4)).to.equal(-10, "-6 + -4 should equal -10");
        expect(add(6, -4)).to.equal(2, "6 + -4 should equal 2");
        expect(add(0, 4)).to.equal(4, "0 + 4 should equal 4");
        expect(add(6, 0)).to.equal(6, "6 + 0 should equal 6");
        expect(add(0, 0)).to.equal(0, "0 + 0 should equal 0");
      });
    });

    describe("edge cases", () => {
      it("should handle very large and very small numbers", () => {
        expect(add(Number.MAX_SAFE_INTEGER, 1)).to.equal(
          Number.MAX_SAFE_INTEGER + 1,
          "MAX_SAFE_INTEGER + 1 should equal MAX_SAFE_INTEGER + 1"
        );
        expect(add(Number.MIN_SAFE_INTEGER, -1)).to.equal(
          Number.MIN_SAFE_INTEGER - 1,
          "MIN_SAFE_INTEGER - 1 should equal MIN_SAFE_INTEGER - 1"
        );
      });

      it("should handle operations with Infinity", () => {
        expect(add(Infinity, 1)).to.equal(
          Infinity,
          "Infinity + 1 should equal Infinity"
        );
        expect(add(1, Infinity)).to.equal(
          Infinity,
          "1 + Infinity should equal Infinity"
        );
        expect(add(-Infinity, 1)).to.equal(
          -Infinity,
          "-Infinity + 1 should equal -Infinity"
        );
        expect(add(1, -Infinity)).to.equal(
          -Infinity,
          "1 + -Infinity should equal -Infinity"
        );
      });
    });
  });

  describe("negative tests", () => {
    it("should handle adding numbers and strings", () => {
      expect(add(6, "4")).to.equal(10, '6 + "4" should equal 10');
      expect(add("6", 4)).to.equal(10, '"6" + 4 should equal 10');
      expect(add("6", "4")).to.equal(10, '"6" + "4" should equal 10');
    });

    it("should handle adding numbers and null", () => {
      expect(add(null, 4)).to.equal(4, "null + 4 should equal 4");
      expect(add(6, null)).to.equal(6, "6 + null should equal 6");
    });

    it("should handle adding numbers and undefined", () => {
      expect(add(undefined, 4)).to.equal(4, "undefined + 4 should equal 4");
      expect(add(6, undefined)).to.equal(6, "6 + undefined should equal 6");
    });
    it("should handle adding numbers and functions", () => {
      expect(add(6, () => {})).to.be.NaN;
      expect(add(() => {}, 4)).to.be.NaN;
    });

    it("should handle adding numbers and objects", () => {
      expect(add(6, {})).to.be.NaN;
      expect(add({}, 4)).to.be.NaN;
    });

    it("should handle adding numbers and arrays", () => {
      expect(add(6, [])).to.be.NaN;
      expect(add([], 4)).to.be.NaN;
    });

    it("should handle adding numbers and booleans", () => {
      expect(add(6, true)).to.be.NaN;
      expect(add(false, 4)).to.be.NaN;
    });
  });
});

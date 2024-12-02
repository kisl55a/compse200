import { expect } from "chai";
import map from "../src/map.js";

describe("map", () => {
  describe("positive tests", () => {
    describe("map with string and numbers", () => {
      it("should map an array of numbers with a function that squares each number", () => {
        const array = [1, 2, 3, 4];
        const iteratee = (n) => n * n;
        const result = map(array, iteratee);
        expect(result).to.deep.equal(
          [1, 4, 9, 16],
          "Each number should be squared"
        );
      });

      it("should map an array of strings with a function that converts each string to uppercase", () => {
        const array = ["a", "b", "c"];
        const iteratee = (str) => str.toUpperCase();
        const result = map(array, iteratee);
        expect(result).to.deep.equal(
          ["A", "B", "C"],
          "Each string should be converted to uppercase"
        );
      });
    });

    describe("map with empty array", () => {
      it("should return an empty array when mapping an empty array", () => {
        const array = [];
        const iteratee = (n) => n * n;
        const result = map(array, iteratee);
        expect(result).to.deep.equal(
          [],
          "Mapping an empty array should return an empty array"
        );
      });

      it("should return an empty array when mapping a null array", () => {
        const array = null;
        const iteratee = (n) => n * n;
        const result = map(array, iteratee);
        expect(result).to.deep.equal(
          [],
          "Mapping a null array should return an empty array"
        );
      });

      it("should return an empty array when mapping an undefined array", () => {
        const array = undefined;
        const iteratee = (n) => n * n;
        const result = map(array, iteratee);
        expect(result).to.deep.equal(
          [],
          "Mapping an undefined array should return an empty array"
        );
      });
    });

    describe("map with objects and mixed types", () => {
      it("should map an array with a function that uses the index and array arguments", () => {
        const array = [1, 2, 3];
        let indexResult = [];
        let arrayResult = [];
        const iteratee = (n, index, arr) => {
          indexResult.push(index);
          arrayResult.push(arr);
          return n + index;
        };
        const result = map(array, iteratee);
        expect(result).to.deep.equal(
          [1, 3, 5],
          "Each element should be incremented by its index"
        );
        expect(indexResult).to.deep.equal(
          [0, 1, 2],
          "Index should be correctly passed to iteratee"
        );
        expect(arrayResult).to.deep.equal(
          [array, array, array],
          "Array should be correctly passed to iteratee"
        );
      });

      it("should map an array of objects with a function that extracts a property", () => {
        const array = [{ a: 1 }, { a: 2 }, { a: 3 }];
        const iteratee = (obj) => obj.a;
        const result = map(array, iteratee);
        expect(result).to.deep.equal(
          [1, 2, 3],
          'Each object\'s "a" property should be extracted'
        );
      });

      it("should map an array of mixed types with a function that returns the type of each element", () => {
        const array = [1, "a", true, null];
        const iteratee = (value) => typeof value;
        const result = map(array, iteratee);
        expect(result).to.deep.equal(
          ["number", "string", "boolean", "object"],
          "Each element's type should be returned"
        );
      });
    });
  });

  describe("negative tests", () => {
    it("should return an empty array when mapping a non-array value", () => {
      const notArray = 123;
      const iteratee = (n) => n * n;
      const result = map(notArray, iteratee);
      expect(result).to.deep.equal(
        [],
        "Mapping a non-array value should return an empty array"
      );
    });

    it("should return an empty array when mapping a boolean value", () => {
      const notArray = true;
      const iteratee = (n) => n * n;
      const result = map(notArray, iteratee);
      expect(result).to.deep.equal(
        [],
        "Mapping a boolean value should return an empty array"
      );
    });

    it("should return an empty array when mapping an object", () => {
      const notArray = { a: 1, b: 2 };
      const iteratee = (n) => n * n;
      const result = map(notArray, iteratee);
      expect(result).to.deep.equal(
        [],
        "Mapping an object should return an empty array"
      );
    });

    it("should return an empty array when mapping a function", () => {
      const notArray = () => {};
  		const iteratee = (n) => n * n;
      const result = map(notArray, iteratee);
      expect(result).to.deep.equal(
        [],
        "Mapping a function should return an empty array"
      );
    });
  });
});

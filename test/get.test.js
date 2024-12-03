import { expect } from "chai";
import get from "../src/get.js";

describe("get", () => {
  describe("positive tests", () => {
    it("should get the value at the given path of the object", () => {
      const object = { a: [{ b: { c: 3 } }] };
      const result = get(object, "a[0].b.c");
      expect(result).to.equal(3);
    });

    it("should get the value at the given array path of the object", () => {
      const object = { a: [{ b: { c: 3 } }] };
      const result = get(object, ["a", "0", "b", "c"]);
      expect(result).to.equal(3);
    });

    it("should return the default value if the resolved value is undefined", () => {
      const object = { a: [{ b: { c: 3 } }] };
      const result = get(object, "a.b.c", "default");
      expect(result).to.equal("default");
    });

    it("should get the value at a muulti-level deep path of the object", () => {
      const object = {
        a: { b: { c: { d: { e: { f: { g: { h: { i: { j: 10 } } } } } } } } },
      };
      const result = get(object, "a.b.c.d.e.f.g.h.i.j");
      expect(result).to.equal(10);
    });
  });

  describe("negative tests", () => {
    it("should return the default value when object is null", () => {
      const result = get(null, "a.b.c", "default");
      expect(result).to.equal("default");
    });

    it("should return the default value when object is undefined", () => {
      const result = get(undefined, "a.b.c", "default");
      expect(result).to.equal("default");
    });

    it("should return the default value when path is invalid", () => {
      const object = { a: [{ b: { c: 3 } }] };
      const result = get(object, "a[0].b.d", "default");
      expect(result).to.equal("default");
    });

    it("should return undefined when no default value is provided and path is invalid", () => {
      const object = { a: [{ b: { c: 3 } }] };
      const result = get(object, "a[0].b.d");
      expect(result).to.be.undefined;
    });

    it("should return the default value when path is a number", () => {
      const object = { a: [{ b: { c: 3 } }] };
      const result = get(object, 123, "default");
      expect(result).to.equal("default");
    });

    it("should return the default value when path is a nonsensical string", () => {
      const object = { a: [{ b: { c: 3 } }] };
      const result = get(object, "test", "default");
      expect(result).to.equal("default");
    });
  });
});

// /* eslint-env mocha */
import { expect } from "chai";
import { detectSums, detectSumsEfficient } from "./utils";

const functions = [detectSums, detectSumsEfficient];

functions.forEach((detectSumsFn) => {
  describe(`Detect sums in ${detectSumsFn.name}`, () => {
    it("should fail if input is not an array", () => {
      expect(() => detectSumsFn()).to.throw("Input is not an array");
    });

    it("should return an array", () => {
      const result = detectSumsFn([]);
      expect(result).to.be.instanceof(Array);
    });

    it("should detect sums", () => {
      const result = detectSumsFn([1, 2]);
      expect(result).to.be.instanceof(Array);
      expect(result).to.have.lengthOf(0);
    });

    it("should detect sums in order", () => {
      const result = detectSumsFn([1, 2, 3]);
      expect(result).to.be.instanceof(Array);
      expect(result).to.have.lengthOf(1);
      expect(result).to.deep.include({ pA: 0, pB: 1, sum: 2 });
    });

    it("should detect sums in order [1, 2, 3, 4] ", () => {
      const result = detectSumsFn([1, 2, 3, 4]);
      expect(result).to.be.instanceof(Array);
      expect(result).to.have.lengthOf(2);
      expect(result).to.deep.include(
        { pA: 0, pB: 1, sum: 2 },
        { pA: 0, pB: 2, sum: 3 }
      );
    });

    it("should detect sums in order [3, 0, 3]", () => {
      const result = detectSumsFn([3, 0, 3]);

      expect(result).to.be.instanceof(Array);
      expect(result).to.have.lengthOf(2);
      expect(result).to.deep.include(
        { pA: 0, pB: 1, sum: 2 },
        { pA: 1, pB: 2, sum: 0 }
      );
    });

    it("should resolve when we can't use '2' twice as in '2 + 2 = 4' [1, 2, 4] ", () => {
      const result = detectSumsFn([1, 2, 4]);

      expect(result).to.be.instanceof(Array);
      expect(result).to.have.lengthOf(0);
    });

    it("should resolve when we can't use '3' twice as in '3 + 0 = 3' [3, 0, 2] ", () => {
      const result = detectSumsFn([3, 0, 2]);

      expect(result).to.be.instanceof(Array);
      expect(result).to.have.lengthOf(0);
    });

    it("should detect sum in order [1, 2, 3, 4, 5]", () => {
      const result = detectSumsFn([1, 2, 3, 4, 5]);

      expect(result).to.be.instanceof(Array);
      expect(result).to.have.lengthOf(4);
      expect(result).to.deep.include(
        { pA: 0, pB: 1, sum: 2 },
        { pA: 0, pB: 2, sum: 3 },
        { pA: 0, pB: 3, sum: 4 },
        { pA: 1, pB: 2, sum: 4 }
      );
    });

    it("should return every possible combination once [1, 2, 1, 3]", () => {
      const result = detectSumsFn([1, 2, 1, 3]);

      expect(result).to.be.instanceof(Array);
      expect(result).to.have.lengthOf(3);
      expect(result).to.deep.include(
        { pA: 0, pB: 1, sum: 3 },
        { pA: 0, pB: 2, sum: 1 },
        { pA: 1, pB: 2, sum: 3 }
      );
    });

    it("should return every possible combination once [1, 2, 1, 2, 3]", () => {
      const result = detectSumsFn([1, 2, 1, 2, 3]);

      expect(result).to.be.instanceof(Array);
      expect(result).to.have.lengthOf(6);
      expect(result).to.deep.include(
        { pA: 0, pB: 1, sum: 4 },
        { pA: 0, pB: 2, sum: 1 },
        { pA: 0, pB: 2, sum: 3 },
        { pA: 0, pB: 3, sum: 4 },
        { pA: 1, pB: 2, sum: 4 },
        { pA: 2, pB: 3, sum: 4 }
      );
    });

    it("should handle large numbers correctly", () => {
      const result = detectSumsFn([100000, 200000, 300000]);

      expect(result).to.be.instanceof(Array);
      expect(result).to.have.lengthOf(1);
      expect(result).to.deep.include({ pA: 0, pB: 1, sum: 2 });
    });

    it("should handle negative numbers correctly", () => {
      const result = detectSumsFn([-1, 0, 1]);

      expect(result).to.deep.include({ pA: 0, pB: 2, sum: 1 });
    });

    it("should return an empty array if the array has fewer than 3 elements", () => {
      expect(detectSumsFn([1])).to.deep.equal([]);
      expect(detectSumsFn([1, 2])).to.deep.equal([]);
    });

    it("should handle arrays with zeros correctly", () => {
      const result = detectSumsFn([0, 0, 0]);

      expect(result).to.deep.include({ pA: 0, pB: 1, sum: 2 });
    });
  });
});

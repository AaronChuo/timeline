import { clamp, roundToStep } from "./mathUtils";

describe("mathUtils", () => {
  describe("clamp", () => {
    it("returns the value if it is within the range", () => {
      expect(clamp(5, 0, 10)).toBe(5);
    });

    it("returns the minimum value if the value is below the range", () => {
      expect(clamp(-5, 0, 10)).toBe(0);
    });

    it("returns the maximum value if the value is above the range", () => {
      expect(clamp(15, 0, 10)).toBe(10);
    });

    it("handles edge cases where the value equals min or max", () => {
      expect(clamp(0, 0, 10)).toBe(0);
      expect(clamp(10, 0, 10)).toBe(10);
    });
  });

  describe("roundToStep", () => {
    it("rounds the value to the nearest step", () => {
      expect(roundToStep(25, 10)).toBe(30);
      expect(roundToStep(24, 10)).toBe(20);
    });

    it("handles the value is already a multiple of the step", () => {
      expect(roundToStep(20, 10)).toBe(20);
    });

    it("rounds negative values correctly", () => {
      expect(roundToStep(-24, 10)).toBe(-20);
    });

    it("returns 0 if the value is 0", () => {
      expect(roundToStep(0, 10)).toBe(0);
    });

    it("handles small steps correctly", () => {
      expect(roundToStep(2.5, 0.5)).toBe(2.5);
      expect(roundToStep(2.4, 0.5)).toBe(2.5);
    });

    it("handles steps larger than the value", () => {
      expect(roundToStep(2, 10)).toBe(0);
      expect(roundToStep(8, 10)).toBe(10);
    });
  });
});

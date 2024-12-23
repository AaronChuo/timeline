import {
  selectTime,
  selectDuration,
  selectScrollLeft,
  selectScrollTop,
} from "./timelineSelector";

describe("timeline selectors", () => {
  const mockState = {
    timeline: {
      time: 500,
      duration: 2000,
      scrollLeft: 100,
      scrollTop: 50,
    },
  };

  it("selects the time", () => {
    const result = selectTime(mockState);
    expect(result).toBe(500);
  });

  it("selects the duration", () => {
    const result = selectDuration(mockState);
    expect(result).toBe(2000);
  });

  it("selects the scrollLeft", () => {
    const result = selectScrollLeft(mockState);
    expect(result).toBe(100);
  });

  it("selects the scrollTop", () => {
    const result = selectScrollTop(mockState);
    expect(result).toBe(50);
  });
});

import { render, screen } from "@testing-library/react";
import { Segment } from "./Segment";
import { TimelineContext } from "../../context/timeline/timelineContext";

describe("Segment", () => {
  it("renders correctly with initial duration", () => {
    const mockState = { duration: 1200, time: 0, scrollLeft: 0, scrollTop: 0 };
    render(
      <TimelineContext.Provider value={{ state: mockState, dispatch: jest.fn() }}>
        <Segment />
      </TimelineContext.Provider>
    );
    const segment = screen.getByTestId("segment");

    expect(segment).toBeInTheDocument();
    expect(segment).toHaveStyle("width: 1200px");
  });

  it("updates width when duration changes", () => {
    const mockState = { duration: 3300, time: 0, scrollLeft: 0, scrollTop: 0 };
    const { rerender } = render(
      <TimelineContext.Provider value={{ state: mockState, dispatch: jest.fn() }}>
        <Segment />
      </TimelineContext.Provider>
    );

    const segment = screen.getByTestId("segment");
    expect(segment).toHaveStyle("width: 3300px");

    const updatedState = { duration: 5000, time: 0, scrollLeft: 0, scrollTop: 0 };
    rerender(
      <TimelineContext.Provider value={{ state: updatedState, dispatch: jest.fn() }}>
        <Segment />
      </TimelineContext.Provider>
    );

    expect(segment).toHaveStyle("width: 5000px");
  });
});

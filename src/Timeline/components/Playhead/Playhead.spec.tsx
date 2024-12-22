import { render, screen } from "@testing-library/react";
import { Playhead } from "./Playhead";
import { TimelineContext } from "../../context/timeline/timelineContext";

describe("Playhead", () => {
  it("renders correctly with initial state", () => {
    const mockState = { time: 500, duration: 2000, scrollTop: 0, scrollLeft: 0 };
    render(
      <TimelineContext.Provider value={{ state: mockState, dispatch: jest.fn() }}>
        <Playhead />
      </TimelineContext.Provider>
    );
    const playhead = screen.getByTestId("playhead");

    expect(playhead).toBeInTheDocument();
  });

  it("calculates position based on time and scrollLeft", () => {
    const mockState = { time: 500, scrollLeft: 200, duration: 2000, scrollTop: 0 };
    render(
      <TimelineContext.Provider value={{ state: mockState, dispatch: jest.fn() }}>
        <Playhead />
      </TimelineContext.Provider>
    );
    const playhead = screen.getByTestId("playhead");

    expect(playhead).toHaveStyle("transform: translateX(calc(300px - 50%))");
  });

  it("hides Playhead when out of view", () => {
    const mockState = { time: -50, scrollLeft: 0, duration: 2000, scrollTop: 0 };
    render(
      <TimelineContext.Provider value={{ state: mockState, dispatch: jest.fn() }}>
        <Playhead />
      </TimelineContext.Provider>
    );
    const playhead = screen.getByTestId("playhead");

    expect(playhead).toHaveClass("hidden");
  });

  it("shows Playhead when in view", () => {
    const mockState = { time: 100, scrollLeft: 0, duration: 2000, scrollTop: 0 };
    render(
      <TimelineContext.Provider value={{ state: mockState, dispatch: jest.fn() }}>
        <Playhead />
      </TimelineContext.Provider>
    );
    const playhead = screen.getByTestId("playhead");

    expect(playhead).not.toHaveClass("hidden");
  });

  it("updates visibility and position when time or scrollLeft changes", () => {
    const mockState = { time: 500, scrollLeft: 0, duration: 2000, scrollTop: 0 };
    const { rerender } = render(
      <TimelineContext.Provider value={{ state: mockState, dispatch: jest.fn() }}>
        <Playhead />
      </TimelineContext.Provider>
    );
    const playhead = screen.getByTestId("playhead");

    expect(playhead).toHaveStyle("transform: translateX(calc(500px - 50%))");

    const updatedState = { time: 800, scrollLeft: 200, duration: 2000, scrollTop: 0 };
    rerender(
      <TimelineContext.Provider value={{ state: updatedState, dispatch: jest.fn() }}>
        <Playhead />
      </TimelineContext.Provider>
    );

    expect(playhead).toHaveStyle("transform: translateX(calc(600px - 50%))");
    expect(playhead).not.toHaveClass("hidden");
  });
});

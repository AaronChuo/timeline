import { render, screen, fireEvent } from "@testing-library/react";
import { KeyframeList } from "./KeyframeList";
import { TimelineContext } from "../../context/timeline/timelineContext";

describe("KeyframeList", () => {
  it("renders correctly with initial state", () => {
    const mockState = { scrollLeft: 0, scrollTop: 0, time: 0, duration: 2000 };
    render(
      <TimelineContext.Provider value={{ state: mockState, dispatch: jest.fn() }}>
        <KeyframeList />
      </TimelineContext.Provider>
    );
    const keyframeList = screen.getByTestId("keyframe-list");

    expect(keyframeList).toBeInTheDocument();
  });

  it("dispatches SET_SCROLL_LEFT and SET_SCROLL_TOP when scrolled", () => {
    const mockDispatch = jest.fn();
    const mockState = { scrollLeft: 0, scrollTop: 0, time: 0, duration: 2000 };
    render(
      <TimelineContext.Provider value={{ state: mockState, dispatch: mockDispatch }}>
        <KeyframeList />
      </TimelineContext.Provider>
    );
    const keyframeList = screen.getByTestId("keyframe-list");

    fireEvent.scroll(keyframeList, { target: { scrollLeft: 100, scrollTop: 50 } });

    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_SCROLL_LEFT", payload: 100 });
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_SCROLL_TOP", payload: 50 });
  });

  it("updates scrollLeft and scrollTop when context state changes", () => {
    const mockState = { scrollLeft: 0, scrollTop: 0, time: 0, duration: 2000 };
    const { rerender } = render(
      <TimelineContext.Provider value={{ state: mockState, dispatch: jest.fn() }}>
        <KeyframeList />
      </TimelineContext.Provider>
    );
    const keyframeList = screen.getByTestId("keyframe-list");

    expect(keyframeList.scrollLeft).toBe(0);
    expect(keyframeList.scrollTop).toBe(0);

    const updatedState = { scrollLeft: 150, scrollTop: 60, time: 0, duration: 2000 };
    rerender(
      <TimelineContext.Provider value={{ state: updatedState, dispatch: jest.fn() }}>
        <KeyframeList />
      </TimelineContext.Provider>
    );

    expect(keyframeList.scrollLeft).toBe(150);
    expect(keyframeList.scrollTop).toBe(60);
  });
});

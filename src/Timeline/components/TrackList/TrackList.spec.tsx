import { render, screen, fireEvent } from "@testing-library/react";
import { TrackList } from "./TrackList";
import { TimelineContext } from "../../context/timeline/timelineContext";

describe("TrackList", () => {
  it("renders correctly with initial state", () => {
    const mockState = { scrollTop: 0, time: 0, duration: 2000, scrollLeft: 0 };
    render(
      <TimelineContext.Provider value={{ state: mockState, dispatch: jest.fn() }}>
        <TrackList />
      </TimelineContext.Provider>
    );
    const trackList = screen.getByTestId("track-list");

    expect(trackList).toBeInTheDocument();
  });

  it("dispatches SET_SCROLL_TOP when scrolled", () => {
    const mockDispatch = jest.fn();
    const mockState = { scrollTop: 0, time: 0, duration: 2000, scrollLeft: 0 };
    render(
      <TimelineContext.Provider value={{ state: mockState, dispatch: mockDispatch }}>
        <TrackList />
      </TimelineContext.Provider>
    );
    const trackList = screen.getByTestId("track-list");

    fireEvent.scroll(trackList, { target: { scrollTop: 120 } });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_SCROLL_TOP",
      payload: 120,
    });
  });

  it("updates scrollTop when context state changes", () => {
    const mockState = { scrollTop: 50, time: 0, duration: 2000, scrollLeft: 0 };
    const { rerender } = render(
      <TimelineContext.Provider value={{ state: mockState, dispatch: jest.fn() }}>
        <TrackList />
      </TimelineContext.Provider>
    );
    const trackList = screen.getByTestId("track-list");
    expect(trackList.scrollTop).toBe(50);

    const updatedState = { scrollTop: 200, time: 0, duration: 2000, scrollLeft: 0 };
    rerender(
      <TimelineContext.Provider value={{ state: updatedState, dispatch: jest.fn() }}>
        <TrackList />
      </TimelineContext.Provider>
    );
    expect(trackList.scrollTop).toBe(200);
  });
});

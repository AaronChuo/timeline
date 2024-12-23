import { screen, fireEvent } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { renderWithRedux } from "../../testUtils/renderWithRedux";
import { TrackList } from "./TrackList";
import timelineReducer, { setScrollTop } from "../../redux/slices/timelineSlice";

describe("TrackList", () => {
  let store: any;
  let getTimelineState: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        timeline: timelineReducer,
      },
      preloadedState: {
        timeline: {
          time: 100,
          duration: 2000,
          scrollLeft: 0,
          scrollTop: 0,
        },
      },
    });
    getTimelineState = () => store.getState().timeline;
  });
 
  it("renders correctly with initial state", () => {
    renderWithRedux(<TrackList />, store);
    const trackList = screen.getByTestId("track-list");

    expect(trackList).toBeInTheDocument();
  });

  it("dispatches SET_SCROLL_TOP when scrolled", () => {
    renderWithRedux(<TrackList />, store);
    const trackList = screen.getByTestId("track-list");

    fireEvent.scroll(trackList, { target: { scrollTop: 120 } });
    expect(getTimelineState().scrollTop).toBe(120);
  });

  it("updates scrollTop when state changes", () => {
    const { rerender } = renderWithRedux(<TrackList />, store);
    const trackList = screen.getByTestId("track-list");
    expect(trackList.scrollTop).toBe(0);

    store.dispatch(setScrollTop(200));
    rerender(<Provider store={store}><TrackList /></Provider>);
    expect(trackList.scrollTop).toBe(200);
  });
});

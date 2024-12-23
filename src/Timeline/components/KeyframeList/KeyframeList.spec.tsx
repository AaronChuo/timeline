import { screen, fireEvent } from "@testing-library/react";
import { KeyframeList } from "./KeyframeList";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { renderWithRedux } from "../../testUtils/renderWithRedux";
import timelineReducer, { setScrollLeft, setScrollTop } from "../../redux/slices/timelineSlice";

describe("KeyframeList", () => {
  let store: any;
  let getTimelineState: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        timeline: timelineReducer,
      },
      preloadedState: {
        timeline: {
          time: 0,
          duration: 2000,
          scrollLeft: 0,
          scrollTop: 0,
        },
      },
    });
    getTimelineState = () => store.getState().timeline;
  });
 
  it("renders correctly with initial state", () => {
    renderWithRedux(<KeyframeList />, store);
    const keyframeList = screen.getByTestId("keyframe-list");

    expect(keyframeList).toBeInTheDocument();
  });

  it("dispatches SET_SCROLL_LEFT and SET_SCROLL_TOP when scrolled", () => {
    renderWithRedux(<KeyframeList />, store);
    const keyframeList = screen.getByTestId("keyframe-list");

    fireEvent.scroll(keyframeList, { target: { scrollLeft: 100, scrollTop: 50 } });

    expect(getTimelineState().scrollLeft).toBe(100);
    expect(getTimelineState().scrollTop).toBe(50);
  });

  it("updates scrollLeft and scrollTop when context state changes", () => {
    const { rerender } = renderWithRedux(<KeyframeList />, store);
    const keyframeList = screen.getByTestId("keyframe-list");

    expect(keyframeList.scrollLeft).toBe(0);
    expect(keyframeList.scrollTop).toBe(0);

    store.dispatch(setScrollLeft(150));
    store.dispatch(setScrollTop(60));
    rerender(<Provider store={store}><KeyframeList /></Provider>);

    expect(keyframeList.scrollLeft).toBe(150);
    expect(keyframeList.scrollTop).toBe(60);
  });
});

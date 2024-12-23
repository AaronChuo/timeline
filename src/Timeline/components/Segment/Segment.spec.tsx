import { screen } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { renderWithRedux } from "../../testUtils/renderWithRedux";
import { Segment } from "./Segment";
import timelineReducer, { setDuration } from "../../redux/slices/timelineSlice";

describe("Segment", () => {
  let store: any;

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
  });

  it("renders correctly with initial duration", () => {
    renderWithRedux(<Segment />, store);
    const segment = screen.getByTestId("segment");

    expect(segment).toBeInTheDocument();
    expect(segment).toHaveStyle("width: 2000px");
  });

  it("updates width when duration changes", () => {
    store.dispatch(setDuration(3300));
    const { rerender } = renderWithRedux(<Segment />, store);

    const segment = screen.getByTestId("segment");
    expect(segment).toHaveStyle("width: 3300px");

    store.dispatch(setDuration(5000));
    rerender(<Provider store={store}><Segment /></Provider>);
    expect(segment).toHaveStyle("width: 5000px");
  });
});

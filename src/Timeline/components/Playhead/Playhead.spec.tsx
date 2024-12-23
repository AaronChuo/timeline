import { screen } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { renderWithRedux } from "../../testUtils/renderWithRedux";
import { Provider } from "react-redux";
import { Playhead } from "./Playhead";
import timelineReducer, { setTime, setScrollLeft} from "../../redux/slices/timelineSlice";

describe("Playhead", () => {
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

  it("renders correctly with initial state", () => {
    renderWithRedux(<Playhead />, store);
    const playhead = screen.getByTestId("playhead");

    expect(playhead).toBeInTheDocument();
  });

  it("calculates position based on time and scrollLeft", () => {
    renderWithRedux(<Playhead />, store);
    const playhead = screen.getByTestId("playhead");

    expect(playhead).toHaveStyle("transform: translateX(calc(100px - 50%))");
  });

  it("hides Playhead when out of view", () => {
    store.dispatch(setTime(-50));
    renderWithRedux(<Playhead />, store);
    const playhead = screen.getByTestId("playhead");

    expect(playhead).toHaveClass("hidden");
  });

  it("shows Playhead when in view", () => {
    renderWithRedux(<Playhead />, store);
    const playhead = screen.getByTestId("playhead");

    expect(playhead).not.toHaveClass("hidden");
  });

  it("updates visibility and position when time or scrollLeft changes", () => {
    const { rerender } = renderWithRedux(<Playhead />, store);
    const playhead = screen.getByTestId("playhead");

    expect(playhead).toHaveStyle("transform: translateX(calc(100px - 50%))");

    store.dispatch(setTime(800));
    store.dispatch(setScrollLeft(200));
    rerender(<Provider store={store}><Playhead /></Provider>);

    expect(playhead).toHaveStyle("transform: translateX(calc(600px - 50%))");
    expect(playhead).not.toHaveClass("hidden");
  });
});

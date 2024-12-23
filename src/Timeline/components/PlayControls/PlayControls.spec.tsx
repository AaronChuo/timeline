import { screen, fireEvent } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { renderWithRedux } from "../../testUtils/renderWithRedux";
import { PlayControls } from "./PlayControls";
import timelineReducer from "../../redux/slices/timelineSlice";

describe("PlayControls", () => {
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
    renderWithRedux(<PlayControls />, store);
    const timeInput = screen.getByTestId("current-time-input");
    const durationInput = screen.getByTestId("duration-input");

    expect(timeInput).toBeInTheDocument();
    expect(durationInput).toBeInTheDocument();
    expect(timeInput).toHaveValue(100);
    expect(durationInput).toHaveValue(2000);
  });

  it("dispatches setTime when time is changed", () => {
    renderWithRedux(<PlayControls />, store);
    const timeInput = screen.getByTestId("current-time-input");

    fireEvent.change(timeInput, { target: { value: "150" } });
    fireEvent.blur(timeInput);

    expect(getTimelineState().time).toBe(150);
  });

  it("dispatches setDuration when duration is changed", () => {
    renderWithRedux(<PlayControls />, store);
    const durationInput = screen.getByTestId("duration-input");

    fireEvent.change(durationInput, { target: { value: "3000" } });
    fireEvent.blur(durationInput);

    expect(getTimelineState().duration).toBe(3000);
  });

  it("limits time to not over duration", () => {
    renderWithRedux(<PlayControls />, store);

    const timeInput = screen.getByTestId("current-time-input");

    fireEvent.change(timeInput, { target: { value: "2500" } });
    fireEvent.blur(timeInput);

    expect(getTimelineState().time).toBe(2000);
  });

  it("limits duration to minimum and maximum range", () => {
    renderWithRedux(<PlayControls />, store);
    const durationInput = screen.getByTestId("duration-input");
    
    fireEvent.change(durationInput, { target: { value: "50" } });
    fireEvent.blur(durationInput);

    expect(getTimelineState().duration).toBe(100);

    fireEvent.change(durationInput, { target: { value: "7000" } });
    fireEvent.blur(durationInput);

    expect(getTimelineState().duration).toBe(6000);
  });
});

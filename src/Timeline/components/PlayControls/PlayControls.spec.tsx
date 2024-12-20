import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { PlayControls } from "./PlayControls";
import { TimelineContext } from "../../context/timelineContext";

describe("PlayControls", () => {
  it("renders correctly with initial state", () => {
    const state = { time: 100, duration: 2000 };
    const dispatch = jest.fn();

    render(
      <TimelineContext.Provider value={{ state, dispatch }}>
        <PlayControls />
      </TimelineContext.Provider>
    );

    const timeInput = screen.getByTestId("current-time-input");
    const durationInput = screen.getByTestId("duration-input");

    expect(timeInput).toBeInTheDocument();
    expect(durationInput).toBeInTheDocument();
    expect(timeInput).toHaveValue(100);
    expect(durationInput).toHaveValue(2000);
  });

  it("dispatches SET_TIME when time is changed", () => {
    const state = { time: 100, duration: 2000 };
    const mockDispatch = jest.fn();

    render(
      <TimelineContext.Provider value={{ state, dispatch: mockDispatch }}>
        <PlayControls />
      </TimelineContext.Provider>
    );

    const timeInput = screen.getByTestId("current-time-input");
    fireEvent.change(timeInput, { target: { value: "150" } });
    fireEvent.blur(timeInput);

    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_TIME", payload: 150 });
  });

  it("dispatches SET_DURATION when duration is changed", () => {
    const state = { time: 100, duration: 2000 };
    const mockDispatch = jest.fn();

    render(
      <TimelineContext.Provider value={{ state, dispatch: mockDispatch }}>
        <PlayControls />
      </TimelineContext.Provider>
    );

    const durationInput = screen.getByTestId("duration-input");
    fireEvent.change(durationInput, { target: { value: "3000" } });
    fireEvent.blur(durationInput);

    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_DURATION", payload: 3000 });
  });

  it("limits time to not over duration", () => {
    const state = { time: 1900, duration: 2000 };
    const mockDispatch = jest.fn();

    render(
      <TimelineContext.Provider value={{ state, dispatch: mockDispatch }}>
        <PlayControls />
      </TimelineContext.Provider>
    );

    const timeInput = screen.getByTestId("current-time-input");
    fireEvent.change(timeInput, { target: { value: "2500" } });
    fireEvent.blur(timeInput);

    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_TIME", payload: 2000 });
  });

  it("limits duration to minimum and maximum range", () => {
    const state = { time: 100, duration: 2000 };
    const mockDispatch = jest.fn();

    render(
      <TimelineContext.Provider value={{ state, dispatch: mockDispatch }}>
        <PlayControls />
      </TimelineContext.Provider>
    );

    const durationInput = screen.getByTestId("duration-input");
    fireEvent.change(durationInput, { target: { value: "50" } });
    fireEvent.blur(durationInput);

    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_DURATION", payload: 100 });

    fireEvent.change(durationInput, { target: { value: "7000" } });
    fireEvent.blur(durationInput);

    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_DURATION", payload: 6000 });
  });
});

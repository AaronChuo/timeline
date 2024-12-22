import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { TimelineProvider } from "./TimelineProvider";
import { TimelineContext } from "./timelineContext";
import { TimelineAction } from "./types";

describe("TimelineProvider", () => {
  let mockDispatch: jest.Mock;
  let dispatchAction: TimelineAction;

  const TestComponent = () => {
    const context = React.useContext(TimelineContext);
    if (!context) throw new Error("Context is null");

    dispatchAction = { type: "SET_TIME", payload: 1200 };
    context.dispatch = mockDispatch;
  
    return (
      <div>
        <button onClick={() => context.dispatch(dispatchAction)}>
          Dispatch Action
        </button>
        <span>Time: {context.state.time}</span>
        <span>Duration: {context.state.duration}</span>
      </div>
    );
  };

  beforeEach(() => {
    mockDispatch = jest.fn();

    render(
      <TimelineProvider>
        <TestComponent />
      </TimelineProvider>
    );
  })

  it("provides the correct initial state", () => {
    expect(screen.getByText("Time: 0")).toBeInTheDocument();
    expect(screen.getByText("Duration: 2000")).toBeInTheDocument();
  });

  it("allows children to use dispatch", () => {
    fireEvent.click(screen.getByText("Dispatch Action"));

    expect(mockDispatch).toHaveBeenCalledWith(dispatchAction);
  });
});

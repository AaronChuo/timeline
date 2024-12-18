import { timelineReducer } from "./timelineReducer";
import { TimelineState, TimelineAction } from "./types";

describe("timelineReducer", () => {
  let initialState: TimelineState;
  let dispatchAction: Function;

  beforeEach(() => {
    initialState = {
      time: 0,
      duration: 2000
    };
    dispatchAction = (action: TimelineAction) => timelineReducer(initialState, action);
  });

  it("handles SET_TIME action", () => {
    const action: TimelineAction = { type: "SET_TIME", payload: 1500 };

    expect(dispatchAction(action))
      .toEqual({ time: 1500, duration: 2000 });
  });

  it("handles SET_DURATION action", () => {
    const action: TimelineAction = { type: "SET_DURATION", payload: 3000 };

    expect(dispatchAction(action))
      .toEqual({ time: 0, duration: 3000 });
  });

  it("limits time to duration when SET_TIME is dispatched", () => {
    const action: TimelineAction = { type: "SET_TIME", payload: 2500 };

    expect(dispatchAction(action))
      .toEqual({ time: 2000, duration: 2000 });
  });

  it("limits duration to minimum duration", () => {
    const action: TimelineAction = { type: "SET_DURATION", payload: 50 };
  
    expect(dispatchAction(action)).
      toEqual({ time: 0, duration: 100 });
  });
  
  it("limits duration to maximum duration", () => {
    const action: TimelineAction = { type: "SET_DURATION", payload: 7000 };
  
    expect(dispatchAction(action))
      .toEqual({ time: 0, duration: 6000 });
  });

  it("limits time to duration when duration decreases", () => {
    initialState = { time: 2000, duration: 2000 };

    const action: TimelineAction = { type: "SET_DURATION", payload: 1500 };
    const result = timelineReducer(initialState, action);

    expect(result)
      .toEqual({ time: 1500, duration: 1500 });
  });
});

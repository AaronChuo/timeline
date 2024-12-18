import { useReducer } from "react";
import { TimelineContext } from "./timelineContext";
import { timelineReducer } from "./timelineReducer";
import { TimelineState, TimelineProviderProps } from "./types";

export const initialState: TimelineState = {
  time: 0,
  duration: 2000,
};

export const TimelineProvider = ({ children }: TimelineProviderProps) => {
  const [state, dispatch] = useReducer(timelineReducer, initialState);

  return (
    <TimelineContext.Provider value={{ state, dispatch }}>
      {children}
    </TimelineContext.Provider>
  );
};

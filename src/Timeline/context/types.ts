import { ReactNode } from "react";

export type TimelineState = {
  time: number;
  duration: number;
};

export type TimelineAction =
  | { type: "SET_TIME"; payload: number }
  | { type: "SET_DURATION"; payload: number };

export type TimelineContextType = {
  state: TimelineState;
  dispatch: React.Dispatch<TimelineAction>;
};

export type TimelineProviderProps = {
  children: ReactNode;
};

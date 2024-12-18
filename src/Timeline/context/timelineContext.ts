import { createContext } from "react";
import { TimelineContextType } from "./types";
import { initialState } from './TimelineProvider';

export const TimelineContext = createContext<TimelineContextType>({
  state: initialState,
  dispatch: () => {},
});

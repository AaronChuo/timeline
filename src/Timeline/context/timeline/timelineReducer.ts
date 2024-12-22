import { TimelineState, TimelineAction } from "./types";
import { clamp } from "../../utils/mathUtils";

const MIN_DURATION = 100;
const MAX_DURATION = 6000;

export const timelineReducer = (
  state: TimelineState,
  action: TimelineAction
): TimelineState => {
  switch (action.type) {
    case "SET_TIME":
      return {
        ...state,
        time: Math.min(action.payload, state.duration),
      };

    case "SET_DURATION":
      return {
        ...state,
        duration: clamp(action.payload, MIN_DURATION, MAX_DURATION),
        time: Math.min(state.time, action.payload),
      };

    case "SET_SCROLL_LEFT":
      return {
        ...state,
        scrollLeft: action.payload,
      };

    case "SET_SCROLL_TOP":
      return {
        ...state,
        scrollTop: action.payload,
      };

    default:
      return state;
  }
};

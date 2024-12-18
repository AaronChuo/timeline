import { createContext } from "react";
import { TimelineContextType } from "./timelineTypes";

export const TimelineContext = createContext<TimelineContextType | null>(null);

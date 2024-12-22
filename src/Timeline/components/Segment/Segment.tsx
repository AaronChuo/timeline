import { useContext, } from "react";
import { TimelineContext } from "../../context/timeline/timelineContext";

export const Segment = () => {
  const { state } = useContext(TimelineContext);
  const { duration } = state;

  return (
    <div
      className="w-[2000px] py-2"
      style={{ width: `${duration}px` }}
      data-testid="segment"
    >
      <div className="h-6 rounded-md bg-white/10"></div>
    </div>
  );
};

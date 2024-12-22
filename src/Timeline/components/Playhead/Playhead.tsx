import { useContext, useState, useMemo, useEffect } from "react";
import { TimelineContext } from "../../context/timeline/timelineContext";
import { RULER_LEFT_PADDING } from "../../constants/ui";

export const Playhead = () => {
  const { state } = useContext(TimelineContext);
  const { time, scrollLeft } = state;
  const [isVisible, setIsVisible] = useState(true);

  const playheadPosition = useMemo(() => {
    return time - scrollLeft;
  }, [time, scrollLeft]);

  useEffect(() => {
    const isInView = playheadPosition > -RULER_LEFT_PADDING;
    setIsVisible(isInView);
  }, [time, scrollLeft]);

  return (
    <div
      className={`absolute left-[316px] h-full border-l-2 border-solid border-yellow-600 z-10
        ${isVisible ? "block" : "hidden"}
      `}
      data-testid="playhead"
      style={{ transform: `translateX(calc(${playheadPosition}px - 50%))` }}
    >
      <div className="absolute border-solid border-[5px] border-transparent border-t-yellow-600 -translate-x-1.5" />
    </div>
  );
};

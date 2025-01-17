import { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectTime, selectScrollLeft } from "../../redux/selectors/timelineSelector";
import { RULER_LEFT_PADDING } from "../../constants/ui";

export const Playhead = () => {
  const time = useSelector(selectTime);
  const scrollLeft = useSelector(selectScrollLeft);
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

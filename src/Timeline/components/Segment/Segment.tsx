import { useSelector } from "react-redux";
import { selectDuration } from "../../redux/selectors/timelineSelector";

export const Segment = () => {
  const duration = useSelector(selectDuration);

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

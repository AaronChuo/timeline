import { useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectDuration, selectScrollLeft } from "../../redux/selectors/timelineSelector";
import { setScrollLeft, setTime } from "../../redux/slices/timelineSlice";
import { clamp } from "../../utils/mathUtils";
import { RULER_LEFT_PADDING } from "../../constants/ui";

export const Ruler = () => {
  const dispatch = useDispatch();
  const duration = useSelector(selectDuration);
  const scrollLeft = useSelector(selectScrollLeft);
  const rulerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  const calculateTimeFromPosition = useCallback((clientX: number) => {
    const rulerElement = rulerRef?.current;
    if (!rulerElement) return 0;

    const rect = rulerElement.getBoundingClientRect();
    const rulerLeftBound = rect.left + RULER_LEFT_PADDING;
    /* 
      clientX: current mouse click position relative to the screen
      rulerLeftBound: the left bound + padding of the ruler
      scrollLeft: the current scroll position of the state
    */
    const offsetX = clientX - rulerLeftBound + scrollLeft;

    const newTime = Math.round(offsetX);
    return clamp(newTime, 0, duration);
  }, [duration, scrollLeft]);

  // Clicking on the ruler to set the time
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;

    const newTime = calculateTimeFromPosition(e.clientX);
    dispatch(setTime(newTime));
  }, [calculateTimeFromPosition, dispatch]);

  // Dragging and update time when mouse move
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current) return;

    const newTime = calculateTimeFromPosition(e.clientX);
    dispatch(setTime(newTime));
  }, [calculateTimeFromPosition, dispatch]);

  // Stop dragging when mouse up
  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleScroll = useCallback(() => {
    const scrollLeft = rulerRef.current?.scrollLeft || 0;
    dispatch(setScrollLeft(scrollLeft));
  }, [dispatch]);

  useEffect(() => {
    if (rulerRef.current) {
      rulerRef.current.scrollLeft = scrollLeft;
    }
  }, [scrollLeft]);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={rulerRef}
      className="px-4 py-2 min-w-0 
      border-b border-solid border-gray-700 
      overflow-x-auto overflow-y-hidden select-none"
      onMouseDown={handleMouseDown}
      onScroll={handleScroll}
      data-testid="ruler"
    >
      <div
        className="w-[2000px] h-6 rounded-md bg-white/25"
        style={{ width: `${duration}px` }}
        data-testid="ruler-bar"
      />
    </div>
  );
};

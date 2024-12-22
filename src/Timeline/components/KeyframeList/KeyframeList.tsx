import { useRef, useContext, useCallback, useEffect } from "react";
import { TimelineContext } from "../../context/timeline/timelineContext";
import { Segment } from "../Segment/Segment";

export const KeyframeList = () => {
  const { state, dispatch } = useContext(TimelineContext);
  const { scrollLeft, scrollTop } = state;
  const keyframeListRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const keyframeListScrollLeft = keyframeListRef.current?.scrollLeft || 0;
    const keyframeListScrollTop = keyframeListRef.current?.scrollTop || 0;

    dispatch({ type: "SET_SCROLL_LEFT", payload: keyframeListScrollLeft });
    dispatch({ type: "SET_SCROLL_TOP", payload: keyframeListScrollTop });
  }, [dispatch]);

  useEffect(() => {
    if (keyframeListRef.current) {
      keyframeListRef.current.scrollLeft = scrollLeft;
      keyframeListRef.current.scrollTop = scrollTop;
    }
  }, [scrollLeft, scrollTop]);

  return (
    <div
      ref={keyframeListRef}
      className="px-4 min-w-0 overflow-auto
      border-b border-solid border-gray-700 
      overflow-auto select-none"
      onScroll={handleScroll}
      data-testid="keyframe-list"
    >
      <Segment />
      <Segment />
      <Segment />
      <Segment />
      <Segment />
      <Segment />
      <Segment />
      <Segment />
      <Segment />
      <Segment />
    </div>
  );
};

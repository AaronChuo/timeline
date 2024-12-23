import { useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectScrollLeft, selectScrollTop } from "../../redux/selectors/timelineSelector";
import { setScrollLeft, setScrollTop } from "../../redux/slices/timelineSlice";
import { Segment } from "../Segment/Segment";

export const KeyframeList = () => {
  const dispatch = useDispatch();
  const scrollLeft = useSelector(selectScrollLeft);
  const scrollTop = useSelector(selectScrollTop);
  const keyframeListRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const keyframeListScrollLeft = keyframeListRef.current?.scrollLeft || 0;
    const keyframeListScrollTop = keyframeListRef.current?.scrollTop || 0;

    dispatch(setScrollLeft(keyframeListScrollLeft));
    dispatch(setScrollTop(keyframeListScrollTop));
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

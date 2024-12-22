import { useRef, useContext, useCallback, useEffect } from "react";
import { TimelineContext } from "../../context/timeline/timelineContext";

export const TrackList = () => {
  const { state, dispatch } = useContext(TimelineContext);
  const { scrollTop } = state;
  const trackListRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const trackListScrollTop = trackListRef.current?.scrollTop || 0;
    dispatch({ type: "SET_SCROLL_TOP", payload: trackListScrollTop });
  }, [dispatch]);

  useEffect(() => {
    if (trackListRef.current) {
      trackListRef.current.scrollTop = scrollTop;
    }
  }, [scrollTop]);

  return (
    <div
      ref={trackListRef}
      className="grid grid-flow-row auto-rows-[40px]
      border-r border-solid border-r-gray-700 
      overflow-auto"
      onScroll={handleScroll}
      data-testid="track-list"
    >
      <div className="p-2">
        <div>Track A</div>
      </div>
      <div className="p-2">
        <div>Track B</div>
      </div>
      <div className="p-2">
        <div>Track C</div>
      </div>
      <div className="p-2">
        <div>Track D</div>
      </div>
      <div className="p-2">
        <div>Track E</div>
      </div>
      <div className="p-2">
        <div>Track F </div>
      </div>
      <div className="p-2">
        <div>Track G</div>
      </div>
      <div className="p-2">
        <div>Track H</div>
      </div>
      <div className="p-2">
        <div>Track I </div>
      </div>
      <div className="p-2">
        <div>Track J</div>
      </div>
    </div>
  );
};

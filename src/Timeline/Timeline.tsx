import { useState } from "react";
import { Playhead } from "./components/Playhead";
import { Ruler } from "./components/Ruler";
import { TrackList } from "./components/TrackList";
import { KeyframeList } from "./components/KeyframeList";
import { PlayControls } from "./components/PlayControls";

export const Timeline = () => {
  // FIXME: performance concerned
  const [time, setTime] = useState(0);

  return (
    <div
      className="relative h-[300px] w-full grid grid-cols-[300px_1fr] grid-rows-[40px_1fr] 
    bg-gray-800 border-t-2 border-solid border-gray-700"
      data-testid="timeline"
    >
      <PlayControls time={time} setTime={setTime} />
      <Ruler />
      <TrackList />
      <KeyframeList />
      <Playhead time={time} />
    </div>
  );
};

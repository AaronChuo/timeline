import { Playhead } from "./components/Playhead/Playhead";
import { Ruler } from "./components/Ruler/Ruler";
import { TrackList } from "./components/TrackList/TrackList";
import { KeyframeList } from "./components/KeyframeList/KeyframeList";
import { PlayControls } from "./components/PlayControls/PlayControls";
import { TimelineProvider } from "./context/timeline/TimelineProvider";

export const Timeline = () => {
  // FIXME: performance concerned
  // const [time, setTime] = useState(0);

  return (
    <TimelineProvider>
      <div
        id="timeline-container"
        className="relative h-[300px] w-full grid grid-cols-[300px_1fr] grid-rows-[40px_1fr] 
      bg-gray-800 border-t-2 border-solid border-gray-700 overflow-hidden"
        data-testid="timeline"
      >
        <PlayControls />
        <Ruler />
        <TrackList />
        <KeyframeList />
        <Playhead />
      </div>
    </TimelineProvider>
  );
};

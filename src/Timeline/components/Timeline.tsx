import { Provider } from "react-redux";
import { store } from "../redux/store";
import { Playhead } from "./Playhead/Playhead";
import { Ruler } from "./Ruler/Ruler";
import { TrackList } from "./TrackList/TrackList";
import { KeyframeList } from "./KeyframeList/KeyframeList";
import { PlayControls } from "./PlayControls/PlayControls";

export const Timeline = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

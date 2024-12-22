import { useCallback, useContext } from "react";
import { TimelineContext } from "../../context/timeline/timelineContext";
import { NumberInput } from "../NumberInput/NumberInput";

export const PlayControls = () => {
  const { state, dispatch } = useContext(TimelineContext);
  const { time, duration } = state;

  const handleTimeChange = useCallback((value: number) => {
    dispatch({ type: "SET_TIME", payload: value });
  }, [dispatch]);

  const handleDurationChange = useCallback((value: number) => {
    dispatch({ type: "SET_DURATION", payload: value });
  }, [dispatch]);

  return (
    <div
      className="flex items-center justify-between border-b border-r border-solid border-gray-700 
 px-2"
      data-testid="play-controls"
    >
      <fieldset className="flex gap-1">
        Current
        <NumberInput
          dataTestid="current-time-input"
          value={time}
          min={0}
          max={duration}
          step={10}
          onChange={handleTimeChange}
        />
      </fieldset>
      -
      <fieldset className="flex gap-1">
        <NumberInput
          dataTestid="duration-input"
          value={duration}
          min={100}
          max={6000}
          step={10}
          onChange={handleDurationChange}
        />
        Duration
      </fieldset>
    </div>
  );
};

import { useDispatch, useSelector } from "react-redux";
import { selectDuration, selectTime } from "../../redux/selectors/timelineSelector";
import { setDuration, setTime } from "../../redux/slices/timelineSlice";
import { NumberInput } from "../NumberInput/NumberInput";

export const PlayControls = () => {
  const dispatch = useDispatch();
  const time = useSelector(selectTime);
  const duration = useSelector(selectDuration);

  const handleTimeChange = (value: number) => {
    dispatch(setTime(value));
  };

  const handleDurationChange = (value: number) => {
    dispatch(setDuration(value));
  };

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

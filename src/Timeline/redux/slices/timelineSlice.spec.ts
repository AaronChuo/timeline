import timelineReducer, {
  setTime,
  setDuration,
  setScrollLeft,
  setScrollTop,
} from './timelineSlice';

describe('timelineSlice', () => {
  const initialState = {
    time: 0,
    duration: 2000,
    scrollLeft: 0,
    scrollTop: 0,
  };

  it('handles setTime action', () => {
    const nextState = timelineReducer(initialState, setTime(1800));
    expect(nextState.time).toBe(1800);
  });

  it('does not set time beyond duration', () => {
    const nextState = timelineReducer(initialState, setTime(2500));
    expect(nextState.time).toBe(initialState.duration);
  });

  it('handles setDuration action', () => {
    const nextState = timelineReducer(initialState, setDuration(3000));
    expect(nextState.duration).toBe(3000);
  });

  it('clamps duration to minimum value', () => {
    const nextState = timelineReducer(initialState, setDuration(50));
    expect(nextState.duration).toBe(100);
  });

  it('clamps duration to maximum value', () => {
    const nextState = timelineReducer(initialState, setDuration(7000));
    expect(nextState.duration).toBe(6000);
  });

  it('adjusts time when the time is over duration', () => {
    const customState = { ...initialState, time: 1500 };
    const nextState = timelineReducer(customState, setDuration(1000));

    expect(nextState.duration).toBe(1000);
    expect(nextState.time).toBe(1000);
  });

  it('handles setScrollLeft action', () => {
    const nextState = timelineReducer(initialState, setScrollLeft(100));
    expect(nextState.scrollLeft).toBe(100);
  });

  it('handles setScrollTop action', () => {
    const nextState = timelineReducer(initialState, setScrollTop(150));
    expect(nextState.scrollTop).toBe(150);
  });
});

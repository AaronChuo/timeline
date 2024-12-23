import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TimelineState } from '../types';
import { clamp } from '../../utils/mathUtils';

const MIN_DURATION = 100;
const MAX_DURATION = 6000;

const initialState: TimelineState = {
  time: 0,
  duration: 2000,
  scrollLeft: 0,
  scrollTop: 0,
};

const timelineSlice = createSlice({
  name: 'timeline',
  initialState,
  reducers: {
    setTime(state, action: PayloadAction<number>) {
      state.time = Math.min(action.payload, state.duration);
    },
    setDuration(state, action: PayloadAction<number>) {
      state.duration = clamp(action.payload, MIN_DURATION, MAX_DURATION);
      state.time = Math.min(state.time, state.duration);
    },
    setScrollLeft(state, action: PayloadAction<number>) {
      state.scrollLeft = action.payload;
    },
    setScrollTop(state, action: PayloadAction<number>) {
      state.scrollTop = action.payload;
    },
  },
});

export const {
  setTime,
  setDuration,
  setScrollLeft,
  setScrollTop,
} = timelineSlice.actions;

export default timelineSlice.reducer;

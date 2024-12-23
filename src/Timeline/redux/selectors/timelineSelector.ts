import { createSelector } from 'reselect';
import { TimelineState } from '../types';

const selectTimeline = (state: { timeline: TimelineState }) => state.timeline;

export const selectTime = createSelector(
  selectTimeline,
  ({ time }) => time
);

export const selectDuration = createSelector(
  selectTimeline,
  ({ duration }) => duration
);

export const selectScrollLeft = createSelector(
  selectTimeline,
  ({ scrollLeft }) => scrollLeft
);

export const selectScrollTop = createSelector(
  selectTimeline,
  ({ scrollTop }) => scrollTop
);
// store.ts
import { configureStore } from '@reduxjs/toolkit';
import timelineReducer from './slices/timelineSlice';

export const store = configureStore({
  reducer: {
    timeline: timelineReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
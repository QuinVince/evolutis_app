import { configureStore } from '@reduxjs/toolkit';
import queryReducer from './querySlice';
import projectReducer from './projectSlice';

export const store = configureStore({
  reducer: {
    query: queryReducer,
    projects: projectReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import queryReducer from './querySlice';
import projectReducer from './projectSlice';
import pipelineReducer from './pipelineSlice';
import type { Pipeline } from './pipelineSlice';
import { mockProjects, mockPipelines } from '../utils/mockData';

export interface RootState {
  query: ReturnType<typeof queryReducer>;
  projects: ReturnType<typeof projectReducer>;
  pipelines: {
    pipelines: Pipeline[];
  };
}

const rootReducer = combineReducers({
  query: queryReducer,
  projects: projectReducer,
  pipelines: pipelineReducer
});

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    projects: {
      projects: mockProjects
    },
    pipelines: {
      pipelines: mockPipelines
    }
  } as any
});

export type AppDispatch = typeof store.dispatch; 
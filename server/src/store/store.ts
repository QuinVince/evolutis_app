import { configureStore } from '@reduxjs/toolkit';
import queryReducer from './querySlice';
import projectReducer from './projectSlice';
import pipelineReducer from './pipelineSlice';
import { Pipeline } from './pipelineSlice';
import { mockProjects, mockPipelines } from '../utils/mockData';

export interface RootState {
  query: ReturnType<typeof queryReducer>;
  projects: ReturnType<typeof projectReducer>;
  pipelines: {
    pipelines: Pipeline[];
  };
}

export const store = configureStore({
  reducer: {
    query: queryReducer,
    projects: projectReducer,
    pipelines: pipelineReducer
  },
  preloadedState: {
    projects: {
      projects: mockProjects
    },
    pipelines: {
      pipelines: mockPipelines
    }
  }
});

export type AppDispatch = typeof store.dispatch; 
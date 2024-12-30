import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PipelineStatus = 'in_progress' | 'completed';

export interface Pipeline {
  id: string;
  projectId: string;
  name: string;
  fileScreening: 'in_progress' | 'completed';
  totalFiles: number | null;
  duplicates: number | null;
  fileSelection: number | null;
  criteria: number | null;
  lastModified: string;
  currentStep: 'screening' | 'criteria' | 'selection';
  screeningStep: 'new' | 'parser' | 'generator';
  queryData: {
    description?: string;
    query?: string;
    projectTitle?: string;
    projectId: string;
    questions?: string[];
    answers?: Record<string, string>;
    pubmedQuery?: string;
    generatedQuery?: boolean; // Flag to indicate if questions were already generated
  };
}

interface PipelineState {
  pipelines: Pipeline[];
}

const initialState: PipelineState = {
  pipelines: []
};

const pipelineSlice = createSlice({
  name: 'pipeline',
  initialState,
  reducers: {
    createPipeline: (state, action: PayloadAction<{ projectId: string; name: string; id: string }>) => {
      const exists = state.pipelines.some(p => p.id === action.payload.id);
      if (!exists) {
        const newPipeline: Pipeline = {
          id: action.payload.id,
          projectId: action.payload.projectId,
          name: action.payload.name,
          fileScreening: 'in_progress',
          totalFiles: null,
          duplicates: null,
          fileSelection: null,
          criteria: null,
          lastModified: new Date().toISOString(),
          currentStep: 'screening',
          screeningStep: 'new',
          queryData: {
            projectId: action.payload.projectId
          }
        };
        console.log('Pipeline reducer - creating:', newPipeline);
        state.pipelines.push(newPipeline);
      } else {
        console.log('Pipeline already exists, skipping creation:', action.payload.id);
      }
    },
    updatePipeline: (state, action: PayloadAction<Partial<Pipeline> & { id: string }>) => {
      console.log('Pipeline reducer - updating:', action.payload);
      const index = state.pipelines.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.pipelines[index] = {
          ...state.pipelines[index],
          ...action.payload,
          lastModified: new Date().toISOString()
        };
      }
    }
  }
});

export const { createPipeline, updatePipeline } = pipelineSlice.actions;
export default pipelineSlice.reducer;

declare module '../store/store' {
  export interface RootState {
    pipelines: {
      pipelines: Pipeline[];
    };
  }
} 
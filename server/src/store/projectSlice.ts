import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Project {
  id: string;
  name: string;
  status: 'in_progress' | 'done';
  author: string;
  createdAt: string;
  queryCount: number;
  tags: string[];
}

interface ProjectState {
  projects: Project[];
}

const initialState: ProjectState = {
  projects: []
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    },
    updateProject: (state, action: PayloadAction<Project>) => {
      const index = state.projects.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    },
    updateProjectQueries: (state, action: PayloadAction<{ 
      projectId: string; 
      queryCount: number | ((currentCount: number) => number) 
    }>) => {
      const project = state.projects.find(p => p.id === action.payload.projectId);
      if (project) {
        project.queryCount = typeof action.payload.queryCount === 'function' 
          ? action.payload.queryCount(project.queryCount)
          : action.payload.queryCount;
      }
    }
  }
});

export const { addProject, updateProject, updateProjectQueries } = projectSlice.actions;
export default projectSlice.reducer; 
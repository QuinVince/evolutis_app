import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SavedQuery } from '../App';

interface QueryState {
  savedQueries: SavedQuery[];
  currentQuery: SavedQuery | null;
}

const initialState: QueryState = {
  savedQueries: [],
  currentQuery: null
};

const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    saveQuery: (state: QueryState, action: PayloadAction<SavedQuery>) => {
      const index = state.savedQueries.findIndex((q: SavedQuery) => q.id === action.payload.id);
      if (index !== -1) {
        state.savedQueries[index] = action.payload;
      } else {
        state.savedQueries.push(action.payload);
      }
      state.currentQuery = action.payload;
    },
    setCurrentQuery: (state: QueryState, action: PayloadAction<SavedQuery | null>) => {
      state.currentQuery = action.payload;
    },
    clearQueries: (state: QueryState) => {
      state.savedQueries = [];
      state.currentQuery = null;
    },
    deleteQuery: (state: QueryState, action: PayloadAction<string>) => {
      state.savedQueries = state.savedQueries.filter(query => query.id !== action.payload);
      if (state.currentQuery?.id === action.payload) {
        state.currentQuery = null;
      }
    }
  }
});

export const { saveQuery, setCurrentQuery, clearQueries, deleteQuery } = querySlice.actions;
export default querySlice.reducer; 
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  applications: [],
  loading: false,
  error: null,
};

const applicationsSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    fetchApplicationsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchApplicationsSuccess: (state, action) => {
      state.loading = false;
      state.applications = action.payload;
    },
    fetchApplicationsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addApplication: (state, action) => {
      state.applications.push(action.payload);
    },
    updateApplication: (state, action) => {
      const index = state.applications.findIndex(app => app.id === action.payload.id);
      if (index !== -1) {
        state.applications[index] = action.payload;
      }
    },
  },
});

export const { 
  fetchApplicationsStart, 
  fetchApplicationsSuccess, 
  fetchApplicationsFailure,
  addApplication,
  updateApplication 
} = applicationsSlice.actions;
export default applicationsSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  company: [],
  companies: [],
};

const companySlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    FETCH_COMPANY: (state, action) => {
      state.company = action.payload;
    }, 
    FETCH_COMPANIES: (state, action) => {
      state.companies = action.payload;
    }
  },
});

export const { FETCH_COMPANY, FETCH_COMPANIES } = companySlice.actions;

export default companySlice.reducer;

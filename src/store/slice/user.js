import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  currentUser: null,
  userCompanies: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    FETCH_USER: (state, action) => {
      state.currentUser = action.payload;
    },
    FETCH_USERS: (state, action) => {
      state.users = action.payload;
    },
    FETCH_USER_COMPANIES: (state, action) => {
      state.userCompanies = action.payload;
    },
  },
});

export const { FETCH_USER, FETCH_USERS, FETCH_USER_COMPANIES } = userSlice.actions;

export default userSlice.reducer;

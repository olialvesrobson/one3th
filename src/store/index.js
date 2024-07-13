import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/user';
import companyReducer from './slice/company';

const store = configureStore({
  reducer: {
    user: userReducer,
    company: companyReducer,
  },
});

const persister = 'Free';
export { store, persister };
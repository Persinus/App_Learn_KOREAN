// Front-App/Store/store.js
import { configureStore } from '@reduxjs/toolkit';
import darkModeReducer from './DarkMode';
import languageReducer from './Language';
import authReducer from './Authorization';

const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    language: languageReducer,
    auth: authReducer,
  },
});

export default store;

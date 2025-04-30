// filepath: c:\Users\admin\Documents\App_Learn_KOREAN\Front-App\Store\store.js
import { configureStore } from '@reduxjs/toolkit';
import darkModeReducer from './DarkMode';

const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
  },
});

export default store;
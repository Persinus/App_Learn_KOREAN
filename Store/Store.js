// Front-App/Store/store.js
import { configureStore } from '@reduxjs/toolkit';
import darkModeReducer from './DarkMode';
import languageReducer from './Language';


const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    language: languageReducer,
  
  },
});

export default store;

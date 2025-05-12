// Front-App/Store/language.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  language: 'vn', // mặc định là tiếng Việt
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      // Chỉ nhận 'vn' hoặc 'en'
      if (['vn', 'en'].includes(action.payload)) {
        state.language = action.payload;
      }
    },
    toggleLanguage: (state) => {
      state.language = state.language === 'vn' ? 'en' : 'vn';
    },
  },
});

export const { setLanguage, toggleLanguage } = languageSlice.actions;

export default languageSlice.reducer;

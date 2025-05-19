import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDarkMode: false, // Trạng thái mặc định là chế độ sáng
};

const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode; // Đảo trạng thái Dark Mode
    },
    enableDarkMode: (state) => {
      state.isDarkMode = true; // Bật chế độ tối
    },
    disableDarkMode: (state) => {
      state.isDarkMode = false; // Tắt chế độ tối
    },
  },
});

export const { toggleDarkMode, enableDarkMode, disableDarkMode } = darkModeSlice.actions;

export default darkModeSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

// Trạng thái ban đầu
const initialState = {
  isLoggedIn: false,
  token: null,
};

// Tạo slice cho Authorization
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload; // Lưu token
      localStorage.setItem('token', action.payload); // Lưu token vào localStorage
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      localStorage.removeItem('token'); // Xóa token khỏi localStorage
    },
    checkAuth: (state) => {
      const token = localStorage.getItem('token');
      if (token) {
        state.isLoggedIn = true;
        state.token = token;
      } else {
        state.isLoggedIn = false;
        state.token = null;
      }
    },
  },
});

// Export các action
export const { login, logout, checkAuth } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
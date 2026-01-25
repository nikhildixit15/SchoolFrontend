import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,          // 🔹 user email will be stored here
    isLoggedIn: false,    // 🔹 login status
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.userId = action.payload.userId;  // ✅ store email
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.userId = null;      // ❌ clear email
      state.isLoggedIn = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;

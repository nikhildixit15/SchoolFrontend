import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
    studentId: null,
    staffId: null,
    role: "",
    isLoggedIn: false,
  },
  reducers: {
    loginSuccess: (state, action) => {
      const { _id, role, studentId, staffId } = action.payload;

      state.userId = _id;   // common user _id
      state.role = role;
      state.isLoggedIn = true;

      //   role-based ID storage
      if (role === "student") {
        state.studentId = studentId;
        state.staffId = null;
      }

      if (role === "teacher" || role === "staff") {
        state.staffId = staffId;
        state.studentId = null;
      }
    },

    logout: (state) => {
      state.userId = null;
      state.studentId = null;
      state.staffId = null;
      state.role = "";
      state.isLoggedIn = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;

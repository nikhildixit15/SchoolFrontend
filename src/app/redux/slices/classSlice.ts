import { createSlice } from "@reduxjs/toolkit";

export const classSlice = createSlice({
  name: "class",
  initialState: {
    classes: [],
  },
  reducers: {
    setClasses: (state, action) => {
      state.classes = action.payload;
    },
  },
});

export const { setClasses } = classSlice.actions;

export default classSlice.reducer;

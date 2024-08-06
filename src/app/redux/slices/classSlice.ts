import { createSlice } from "@reduxjs/toolkit";

export const classSlice = createSlice({
  name: "class",
  initialState: {
    classes: [],
    examTypeList: [],
    subjectList: [],
    teacherList: [],
  },
  reducers: {
    setMasterData: (state, action) => {
      state.classes = action.payload.classes;
      state.examTypeList = action.payload.examTypeList;
      state.subjectList = action.payload.subjectList;
      state.teacherList = action.payload.teacherList;
    },
  },
});

export const { setMasterData } = classSlice.actions;

export default classSlice.reducer;

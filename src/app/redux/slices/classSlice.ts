import { createSlice } from "@reduxjs/toolkit";

export const classSlice = createSlice({
  name: "class",
  initialState: {
    classes: [],
    examTypeList: [],
    subjectList: [],
    teacherList: [],
    periodList: [],
  },
  reducers: {
    setMasterData: (state, action) => {
      state.classes = action.payload.classes;
      state.examTypeList = action.payload.examTypeList;
      state.subjectList = action.payload.subjectList;
      state.teacherList = action.payload.teacherList;
      state.periodList = action.payload.periodList;
    },
  },
});

export const { setMasterData } = classSlice.actions;

export default classSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const classSlice = createSlice({
  name: "class",
  initialState: {
    classes: [],
    examTypeList: [],
    subjectList: [],
    teacherList: [],
    periodList: [],
    streamList:[]
  },
  reducers: {
    setMasterData: (state, action) => {
      state.classes = action.payload.classes;
      state.examTypeList = action.payload.examTypeList;
      state.subjectList = action.payload.subjectList;
      state.teacherList = action.payload.teacherList;
      state.periodList = action.payload.periodList;
      state.streamList = action.payload.streamList;
    },
  },
});

export const { setMasterData } = classSlice.actions;

export default classSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const classSlice = createSlice({
  name: "class",
  initialState: {
    isLoggedIn: false,
    classes: [],
    examTypeList: [],
    subjectList: [],
    teacherList: [],
    periodList: [],
    streamList:[]
  },
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
      console.log(state.isLoggedIn)
    },
    logout: (state) => {
      state.isLoggedIn = false;
      console.log(state.isLoggedIn)
    },
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

export const { setMasterData,login, logout } = classSlice.actions;

export default classSlice.reducer;

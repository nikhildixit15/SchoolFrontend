import { configureStore } from "@reduxjs/toolkit";
import classReducer from "./slices/classSlice";
export default configureStore({
  reducer: {
    class: classReducer,
  },
});

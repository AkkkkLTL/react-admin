import { createSlice } from "@reduxjs/toolkit";
import { Action, errorLogState } from "../types";

const errorLogSlice = createSlice({
  name: "errorLog",
  initialState: <errorLogState>{
    logs: []
  },
  reducers: {
    addErrorLog: (state, action:Action<string>) => {
      state.logs.push(action.payload);
    },
    clearErrorLog: (state) => {
      state.logs.splice(0);
    }
  }
});

export const {
  addErrorLog,
  clearErrorLog,
} = errorLogSlice.actions;

export default errorLogSlice.reducer;
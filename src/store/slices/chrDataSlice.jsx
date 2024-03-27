import { createSlice } from "@reduxjs/toolkit";

const chrDataSlice = createSlice({
  name: "chrData",
  initialState: {},
  reducers: {
    setChrData(state, action) {
      return action.payload;
    },
    clearChrData() {
      return {};
    }
  },
});

export const { setChrData, clearChrData } = chrDataSlice.actions;
export default chrDataSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    isUserData: false,
    isChrData: false,
    auth_token: null,
    name: null,
    pin_code: null,
    pan_number: null,
    dob: null,
    phone: null,
  },
  reducers: {
    loginUser(state, action) {
        state.isLoggedIn = true,
        state.auth_token = action.payload.auth_token,
        state.phone = action.payload.phoneNumber
    },
    setUserDetails(state, action) {
      state.name = action.payload.name,
      state.dob = action.payload.dob,
      state.pan_number = action.payload.pan_number,
      state.pin_code = action.payload.pin_code,
      state.isUserData = true
    },
    logoutUser(state) {
      state.isLoggedIn = false,
      state.isChrData = false,
      state.isUserData = false,
      state.auth_token = null,
      state.name = null,
      state.pin_code = null,
      state.pan_number = null,
      state.dob = null,
      state.phone = null
    },
    chrDataReceived(state) {
      state.isChrData = true
    }
  },
});

export const { logoutUser, loginUser, setUserDetails, chrDataReceived } = userSlice.actions;
export default userSlice.reducer;

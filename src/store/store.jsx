import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./slices/modalSlice.jsx";
import userReducer from "./slices/userSlice.jsx";
import chrDataReducer from "./slices/chrDataSlice.jsx";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    user: userReducer,
    chrData: chrDataReducer,
  },
});

export default store;

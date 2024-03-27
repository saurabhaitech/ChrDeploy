import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpen: true,
    modalType: "otp",
  },
  reducers: {
    openModal(state, action) {
      state.isOpen = true;
      state.modalType = action.payload;
    },
    closeModal(state) {
      state.isOpen = false;
      state.modalType = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;

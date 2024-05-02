import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  messageSuccess: null,
  messageError: null,
  success: false,
  error: false,
};

const forgotPasswordSlice = createSlice({
  name: "forgotpwd",
  initialState,
  reducers: {
    ForgetPasswordSuccess(state, action) {
      state.messageSuccess = action.payload;
      state.success = true;
    },
    ForgetPasswordError(state, action) {
      state.messageError = action.payload;
      state.error = true;
    },
    
  },
});

export const { ForgetPasswordSuccess, ForgetPasswordError } =
  forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;

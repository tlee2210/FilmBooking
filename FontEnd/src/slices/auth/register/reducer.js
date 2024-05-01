import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  registrationError: null,
  message: null,
  success: false,
  error: false,
};

const registerSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    registerSuccessful(state, action) {
      state.success = true;
      state.message = action.payload;
    },
    registerFailed(state, action) {
      state.message = action.payload;
      state.error = true;
    },
    resetRegisterFlagChange(state) {
      state.success = false;
      state.message = null;
      state.error = false;
    },
    apiErrorChange(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.isUserLogout = false;
    },
  },
});

export const {
  registerSuccessful,
  registerFailed,
  resetRegisterFlagChange,
  apiErrorChange,
} = registerSlice.actions;

export default registerSlice.reducer;

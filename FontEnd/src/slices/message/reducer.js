import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  // isNotificationVisible: false,
  // notificationMessage: "",
  // isErrorNotificationVisible: false,
  // errorMessage: "",
  messageSuccess: null,
  messageError: null,
  success: false,
  error: false,
};

const MessageSlice = createSlice({
  name: "MessageSlice",
  initialState,
  reducers: {
    Success(state, action) {
      state.messageSuccess = action.payload;
      state.success = true;
    },
    clearNotification(state) {
      state.success = false;
      state.error = false;
      state.messageSuccess = null;
      state.messageError = null;
    },
    Error(state, action) {
      state.messageError = action.payload;
      state.error = true;
    },
  },
});

export const { Success, clearNotification, Error } = MessageSlice.actions;

export default MessageSlice.reducer;

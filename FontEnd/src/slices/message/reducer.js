import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  isNotificationVisible: false,
  notificationMessage: "",
  isErrorNotificationVisible: false,
  errorMessage: "",
};

const MessageSlice = createSlice({
  name: "MessageSlice",
  initialState,
  reducers: {
    setMessage(state, action) {
      state.notificationMessage = action.payload;
      state.isNotificationVisible = true;
    },
    clearNotificationMessage(state) {
      state.isNotificationVisible = false;
      state.errorNotification = false;
      state.notificationMessage = "";
      state.isErrorNotificationVisible = null;
      state.errorMessage = "";
    },
    errorMessage(state, action) {
      state.isErrorNotificationVisible = true;
      state.errorMessage = action.payload;
    },
  },
});

export const { setMessage, clearNotificationMessage, errorMessage } =
  MessageSlice.actions;

export default MessageSlice.reducer;

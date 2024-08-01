import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  data: [],
};

const BookingSlice = createSlice({
  name: "Booking",
  initialState,
  reducers: {
    fetchSuccess: (state, action) => {
      // state.loading = false;
      state.data = action.payload.data;
    },
  },
});

export const { fetchSuccess } = BookingSlice.actions;

export default BookingSlice.reducer;

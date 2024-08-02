import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  data: [],
  ticketFast: [],
};

const BookingSlice = createSlice({
  name: "Booking",
  initialState,
  reducers: {
    fetchSuccess: (state, action) => {
      // state.loading = false;
      state.data = action.payload.data;
    },
    bookingTicketFast: (state, action) => {
      // state.loading = false;
      state.ticketFast = action.payload.data;
    },
  },
});

export const { fetchSuccess, bookingTicketFast } = BookingSlice.actions;

export default BookingSlice.reducer;

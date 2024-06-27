import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  citySelect: [],
  cinemaSelect: [],
  bookingShowTime: [],
};

const BookingSlice = createSlice({
  name: "BookingSlice",
  initialState,
  reducers: {
    selectBooking: (state, action) => {
      state.citySelect = action.payload.city;
      state.cinemaSelect = action.payload.cinema;
      state.bookingShowTime = action.payload.bookingShowTimeResponses;
    },
  },
});

export const { selectBooking } = BookingSlice.actions;

export default BookingSlice.reducer;

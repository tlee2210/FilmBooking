import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  citySelect: [],
  cinemaSelect: [],
  bookingShowTime: [],
  bookingitem: JSON.parse(localStorage.getItem("bookingData")) || null,
  BookingFaster: [],
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
    setBooking: (state, action) => {
      state.bookingitem = action.payload;
    },
    setBuyFastTicket: (state, action) => {
      state.buyFastTicket = action.payload;
    },
  },
});

export const { selectBooking, setBooking, setBuyFastTicket } =
  BookingSlice.actions;

export default BookingSlice.reducer;

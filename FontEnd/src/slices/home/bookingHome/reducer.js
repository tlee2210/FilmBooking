import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  citySelect: [],
  cinemaSelect: [],
  bookingShowTime: [],
  bookingitem: JSON.parse(localStorage.getItem("bookingData")) || null,
  BookingFaster: [],
  voucher: [],
  seatsBooked: JSON.parse(localStorage.getItem("seatsBooked")) || null,
  WaterCornData: [],
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
    setVoucher: (state, action) => {
      state.voucher = action.payload;
    },
    setSeatBooked: (state, action) => {
      state.seatsBooked = action.payload.data.seatBooked;
      state.WaterCornData = action.payload.data.waterCorns;
    },
  },
});

export const {
  selectBooking,
  setBooking,
  setBuyFastTicket,
  setVoucher,
  setSeatBooked,
} = BookingSlice.actions;

export default BookingSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  cinemaData: [],
};

const CinemaHomeSlice = createSlice({
  name: "CinemaHomeSlice",
  initialState,
  reducers: {
    setCinema: (state, action) => {
      state.cinemaData = action.payload;
    },
  },
});

export const { setCinema } = CinemaHomeSlice.actions;

export default CinemaHomeSlice.reducer;

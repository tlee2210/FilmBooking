import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  data: [],
  selectOptionCountry: [],
  selectOptionGenre: [],
  selectOptionStatus: [],
  selectOptionYear: [],
  movieDetail: [],
};

const HomeMovieGenreSlice = createSlice({
  name: "HomeMovieGenreSlice",
  initialState,
  reducers: {
    fetchSuccess: (state, action) => {
      state.data = action.payload.data.model;
      state.selectOptionCountry = action.payload.data.selectOptionCountry;
      state.selectOptionGenre = action.payload.data.selectOptionReponse;
      state.selectOptionStatus = action.payload.data.selectOptionStatus;
      state.selectOptionYear = action.payload.data.selectOptionYear;
    },
    setDetail: (state, action) => {
      state.movieDetail = action.payload;
    },
  },
});

export const { fetchSuccess, setDetail } = HomeMovieGenreSlice.actions;

export default HomeMovieGenreSlice.reducer;

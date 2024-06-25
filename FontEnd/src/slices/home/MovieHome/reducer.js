import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  MovieIntroduce: [],
  item: {},
  MovieDetails: [],
};

const HomeMovieSlice = createSlice({
  name: "HomeMovieSlice",
  initialState,
  reducers: {
    fetchSuccess: (state, action) => {
      state.MovieIntroduce = action.payload;
    },
    setItem(state, action) {
      state.item = action.payload.data;
    },
    setMovieDetails(state, action) {
      state.MovieDetails = action.payload;
    },
  },
});

export const { fetchSuccess, setItem, setMovieDetails } =
  HomeMovieSlice.actions;

export default HomeMovieSlice.reducer;

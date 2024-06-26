import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  MovieIntroduce: [],
  item: {},
  MovieDetails: [],
  HomeData: [],
  navbarData: [],
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
    fetchHomeData(state, action) {
      state.HomeData = action.payload.data;
    },
    fetchNavbarData(state, action) {
      state.navbarData = action.payload.data;
    },
  },
});

export const {
  fetchSuccess,
  fetchHomeData,
  setItem,
  setMovieDetails,
  fetchNavbarData,
} = HomeMovieSlice.actions;

export default HomeMovieSlice.reducer;

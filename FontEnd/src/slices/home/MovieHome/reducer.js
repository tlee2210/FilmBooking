import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  MovieIntroduce: [],
  item: {},
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
  },
});

export const { fetchSuccess, setItem } = HomeMovieSlice.actions;

export default HomeMovieSlice.reducer;

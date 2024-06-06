import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  data: [],
  SelectOption: [],
  item: {},
};

const MovieGenreSlice = createSlice({
  name: "MovieGenre",
  initialState,
  reducers: {
    getData: (state, action) => {
      state.data = action.payload;
    },
    getitem: (state, action) => {
      state.item = action.payload;
    },
    clear(state) {
      state.item = null;
    },
  },
});

export const { getData, getitem, clear } = MovieGenreSlice.actions;

export default MovieGenreSlice.reducer;

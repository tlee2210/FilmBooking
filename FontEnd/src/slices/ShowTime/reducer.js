import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  data: [],
  selectCinema: [],
  selectMovie: [],
  selectRoom: [],
  movieItem: {},
};

const ShowTimeSlice = createSlice({
  name: "ShowTime",
  initialState,
  reducers: {
    setMovieAndCinema(state, action) {
      state.selectCinema = action.payload.selectCinema;
      state.selectMovie = action.payload.selectMovie;
    },
    setMovieItem(state, action) {
      state.movieItem = action.payload;
    },
    setRoomItem(state, action) {
      state.selectRoom = action.payload;
    },
    clear(state) {
      state.item = null;
    },
  },
});

export const { clear, setMovieAndCinema, setMovieItem, setRoomItem } =
  ShowTimeSlice.actions;

export default ShowTimeSlice.reducer;

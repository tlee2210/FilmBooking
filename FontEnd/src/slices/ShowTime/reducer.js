import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  data: [],
  selectCinema: [],
  selectMovie: [],
  selectRoom: [],
  movieItem: {},
  item: {},
};

const ShowTimeSlice = createSlice({
  name: "ShowTime",
  initialState,
  reducers: {
    fetchSuccess(state, action) {
      state.selectCinema = action.payload.data.selectOptionReponse;
      state.data = action.payload.data.model;
    },
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
    setShowTime(state, action) {
      state.item = action.payload;
    },
    clear(state) {
      state.item = null;
    },
  },
});

export const {
  clear,
  setMovieAndCinema,
  setMovieItem,
  setRoomItem,
  fetchSuccess,
  setShowTime,
} = ShowTimeSlice.actions;

export default ShowTimeSlice.reducer;

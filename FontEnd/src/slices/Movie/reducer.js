import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  data: [],
  selectActors: [],
  selectCategories: [],
  selectDirectories: [],
  item: {},
};

const MovieSlice = createSlice({
  name: "Movies",
  initialState,
  reducers: {
    fetchSuccess: (state, action) => {
      state.data = action.payload.data.model;
      state.item = action.payload.data.selectOptionReponse;
    },
    setSelectOption(state, action) {
      state.selectActors = action.payload.data.selectActors;
      state.selectCategories = action.payload.data.selectCategories;
      state.selectDirectories = action.payload.data.selectDirectories;
    },
    setItem(state, action) {
      state.item = action.payload;
    },
    removeItem(state, action) {
      state.data.content = state.data.content.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { fetchSuccess, setSelectOption, removeItem, setItem } =
  MovieSlice.actions;

export default MovieSlice.reducer;

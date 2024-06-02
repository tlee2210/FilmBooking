import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  data: [],
  selectOptions: [],
  item: {},
};

const MovieSlice = createSlice({
  name: "Movies",
  initialState,
  reducers: {
    fetchSuccess: (state, action) => {
      state.data = action.payload.data.model;
      state.selectOptions = action.payload.data.selectOptionReponse;
    },
    setSelectOption(state, action) {
      state.selectOptions = action.payload.data;
    },
    setItem(state, action) {
      state.item = action.payload.data.model;
      state.selectOptions = action.payload.data.selectOptionReponse;
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

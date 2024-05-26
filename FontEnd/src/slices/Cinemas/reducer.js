import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  data: [],
  SelectOption: [],
  item: {},
};

const CinemaSlice = createSlice({
  name: "Cinema",
  initialState,
  reducers: {
    fetchSuccess: (state, action) => {
      state.data = action.payload.data.model;
      state.item = action.payload.data.selectOptionReponse;
    },
    setSelectOption(state, action) {
      state.SelectOption = action.payload;
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
  CinemaSlice.actions;

export default CinemaSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  data: [],
  SelectOption: [],
  item: {},
};

const CitySlice = createSlice({
  name: "City",
  initialState,
  reducers: {
    getDate: (state, action) => {
      state.data = action.payload;
    },
    getCityitem: (state, action) => {
      state.item = action.payload;
    },
    clearCity(state) {
      state.item = null;
    },
  },
});

export const { getDate, getCityitem, clearCity } = CitySlice.actions;

export default CitySlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  data: [],
  // selectOptions: [],
  item: {},
};

const WaterCornSlice = createSlice({
  name: "WaterCorn",
  initialState,
  reducers: {
    fetchSuccess: (state, action) => {
      state.data = action.payload.data.model;
      // state.selectOptions = action.payload.data.selectOptionReponse;
    },
    setItem(state, action) {
      state.item = null;
      state.item = action.payload.data;
    },
    removeItem(state, action) {
      // state.data.content = state.data.content.filter(
      //   (item) => item.id !== action.payload
      // );
    },
  },
});

export const { fetchSuccess, removeItem, setItem } = WaterCornSlice.actions;

export default WaterCornSlice.reducer;

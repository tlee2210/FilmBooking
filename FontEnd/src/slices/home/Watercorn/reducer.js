import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  WaterCorn: [],
};

const HomeWaterCornSlice = createSlice({
  name: "HomeWaterCornSlice",
  initialState,
  reducers: {
    fetchSuccess: (state, action) => {
      state.WaterCorn = action.payload;
    },
  },
});

export const { fetchSuccess } = HomeWaterCornSlice.actions;

export default HomeWaterCornSlice.reducer;

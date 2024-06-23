import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  data: [],
  selectOptions: [],
  item: {},
};

const HomeCelebritySlice = createSlice({
  name: "CelebritySlice",
  initialState,
  reducers: {
    fetchSuccess: (state, action) => {
      state.data = action.payload.data.model;
      state.selectOptions = action.payload.data.selectOptionCountry;
    },
    setSelectOption(state, action) {},
    setItem(state, action) {},
    removeItem(state, action) {},
  },
});

export const { fetchSuccess, setSelectOption, removeItem, setItem } =
  HomeCelebritySlice.actions;

export default HomeCelebritySlice.reducer;

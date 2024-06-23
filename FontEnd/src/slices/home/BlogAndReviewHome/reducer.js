import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  data: [],
  selectOptions: [],
  item: {},
};

const HomeBlogAndReviewSlice = createSlice({
  name: "HomeBlogAndReviewSlice",
  initialState,
  reducers: {
    fetchSuccess: (state, action) => {
      state.data = action.payload.data;
      // state.selectOptions = action.payload.data.selectOptionCountry;
    },
    setSelectOption(state, action) {},
    setItem(state, action) {
      state.item = action.payload.data;
    },
    removeItem(state, action) {},
  },
});

export const { fetchSuccess, setSelectOption, removeItem, setItem } =
  HomeBlogAndReviewSlice.actions;

export default HomeBlogAndReviewSlice.reducer;

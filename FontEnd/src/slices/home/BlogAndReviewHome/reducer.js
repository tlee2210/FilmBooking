import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  data: [],
  selectOptions: [],
  otherItem: [],
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
    fetchSuccessReview: (state, action) => {
      state.data = action.payload.data.model;
      state.selectOptions = action.payload.data.selectOptionReponse;
    },
    setSelectOption(state, action) {},
    setItem(state, action) {
      state.item = action.payload.data.review;
    },
    setItemBlog(state, action) {
      state.item = action.payload.data.movieBlog;
      state.otherItem = action.payload.data.blogRelate;
    },
    removeItem(state, action) {},
  },
});

export const {
  fetchSuccess,
  setSelectOption,
  removeItem,
  setItem,
  fetchSuccessReview,
  setItemBlog,
} = HomeBlogAndReviewSlice.actions;

export default HomeBlogAndReviewSlice.reducer;

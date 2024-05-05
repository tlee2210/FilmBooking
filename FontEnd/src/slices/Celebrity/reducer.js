import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  data: [],
  totalPages: 0,
  pageNumber: 0,
  totalElements:0
};

const CelebritySlice = createSlice({
  name: "Celebrity",
  initialState,
  reducers: {
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.totalPages = action.payload.totalPages;
      state.pageNumber = action.payload.pageNumber;
      state.totalElements = action.payload.totalElements;
    },
  },
});

export const { fetchSuccess } = CelebritySlice.actions;

export default CelebritySlice.reducer;

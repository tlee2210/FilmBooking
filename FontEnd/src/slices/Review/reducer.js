import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  data: [],
  SelectOption: [],
  item: {},
};

const ReviewSlice = createSlice({
  name: "Review",
  initialState,
  reducers: {
    fetchSuccess: (state, action) => {
      // state.loading = false;
      state.data = action.payload.data.model;
      state.SelectOption = action.payload.data.selectOptionReponse;
    },
    setSelectOption(state, action) {
      state.SelectOption = action.payload;
    },
    setItem(state, action) {
      state.item = action.payload.data.model;
      state.SelectOption = action.payload.data.selectOptionReponse;
    },
    removeItem(state, action) {
      // console.log(action.payload);
      // console.log("data: " + state.data);
      state.data.content = state.data.content.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { fetchSuccess, setSelectOption, removeItem, setItem } =
  ReviewSlice.actions;

export default ReviewSlice.reducer;

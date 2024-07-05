import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  data: [],
  SelectOption: [],
  item: {},
};

const PromotionSlice = createSlice({
  name: "Promotion",
  initialState,
  reducers: {
    fetchSuccess: (state, action) => {
      // state.loading = false;
      state.data = action.payload.data;
    },
    setSelectOption(state, action) {
      state.SelectOption = action.payload;
    },
    setItem(state, action) {
      state.item = action.payload.data;
    },
    removeItem(state, action) {
      state.data.content = state.data.content.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { fetchSuccess, setSelectOption, removeItem, setItem } =
  PromotionSlice.actions;

export default PromotionSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  data: [],
  item: [],
};

const HomePromotionSlice = createSlice({
  name: "PromotionSlice",
  initialState,
  reducers: {
    fetchSuccess: (state, action) => {
      state.data = action.payload.data;
    },
    setItem(state, action) {
      state.item = action.payload.data.promotion;
      state.related = action.payload.data.promotionRelate;
    },
  },
});

export const { fetchSuccess, setItem } = HomePromotionSlice.actions;

export default HomePromotionSlice.reducer;

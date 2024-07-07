import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  data: [],
  item: [],
};

const VoucherSlice = createSlice({
  name: "Voucher",
  initialState,
  reducers: {
    fetchSuccess(state, action) {
      state.data = action.payload.data;
    },
    setItem(state, action) {
      state.item = action.payload;
    },
  },
});

export const { fetchSuccess, setItem } = VoucherSlice.actions;

export default VoucherSlice.reducer;

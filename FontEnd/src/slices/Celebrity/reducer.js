import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  data: [],
  SelectOption: [],
  item: null,
};

const CelebritySlice = createSlice({
  name: "Celebrity",
  initialState,
  reducers: {
    fetchSuccess: (state, action) => {
      // state.loading = false;
      state.data = action.payload.data;
    },
    setSelectOption(state, action) {
      state.SelectOption = action.payload;
    },
    removeItem(state, action) {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
  },
});

export const { fetchSuccess, setSelectOption, removeItem } =
  CelebritySlice.actions;

export default CelebritySlice.reducer;

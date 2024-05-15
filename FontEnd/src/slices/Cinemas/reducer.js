import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  data: [],
  SelectOption: [],
  item: {},
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
    setItem(state, action) {
      state.item = action.payload;
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
  CelebritySlice.actions;

export default CelebritySlice.reducer;

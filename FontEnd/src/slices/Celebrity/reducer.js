import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  data: [],
  SelectOption: [],
};

const CelebritySlice = createSlice({
  name: "Celebrity",
  initialState,
  reducers: {
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    },
    setSelectOption(state, action) {
      state.SelectOption = action.payload;
    },
  },
});

export const { fetchSuccess, setSelectOption } = CelebritySlice.actions;

export default CelebritySlice.reducer;

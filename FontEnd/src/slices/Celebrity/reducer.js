import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  data: [],
};

const CelebritySlice = createSlice({
  name: "Celebrity",
  initialState,
  reducers: {
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    },
  },
});

export const { fetchSuccess } = CelebritySlice.actions;

export default CelebritySlice.reducer;

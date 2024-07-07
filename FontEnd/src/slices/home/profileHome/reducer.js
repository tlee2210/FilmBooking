import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  ProfileData: [],
};

const HomeProfileSlice = createSlice({
  name: "HomeProfileSlice",
  initialState,
  reducers: {
    fetchSuccess: (state, action) => {
      state.ProfileData = action.payload.data;
    },
  },
});

export const { fetchSuccess } = HomeProfileSlice.actions;

export default HomeProfileSlice.reducer;

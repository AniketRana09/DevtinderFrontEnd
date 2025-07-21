import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeUserFeed: (state, action) => {
      return null;
    },
  },
});
export const { addFeed, removeUserFeed } = feedSlice.actions;
export default feedSlice.reducer;

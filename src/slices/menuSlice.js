import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",
  initialState: [],
  reducers: {
    menuInfo: (state, action) => {
      return action.payload;  
    },
  },
});

export const { menuInfo } = menuSlice.actions;
export default menuSlice.reducer;

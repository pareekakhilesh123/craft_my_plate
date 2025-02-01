import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name:"",
    token: '',
  },
  reducers: {
    addUserInfo: (state, action) => {
      state.name = action.payload.name
      state.token = action.payload.token
    },
  },
});
export const { addUserInfo } = userSlice.actions;
export default userSlice.reducer;
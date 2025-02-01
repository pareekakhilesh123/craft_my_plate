import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",
  initialState: [],
  reducers: {
    menuInfo: (state, action) => {
      return action.payload;  
    },
    onQuantityChange:  (state, action) => {
      const { index, newQuantity } = action.payload
      return state.map((row, i) => {
        if (i === index) {
          return {
            ...row, 
            quantity: newQuantity, 
            total: newQuantity * row.price, 
          };
        } else {
          return row
        }
      })
  }}
})

export const { menuInfo, onQuantityChange } = menuSlice.actions;
export default menuSlice.reducer;

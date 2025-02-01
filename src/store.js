  
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import menuReducer from './slices/menuSlice';
const store = configureStore({
  reducer: {
    user: userReducer,
    menu: menuReducer
  },
});

export default store;

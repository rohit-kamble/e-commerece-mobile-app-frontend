import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducer/userReducer';
import { otherReducer } from './reducer/otherReducer';
import { productReducer } from './reducer/productReducer';
export const store = configureStore({
  reducer: {
    user: userReducer,
    other: otherReducer,
    products: productReducer,
  },
});

export const server = 'https://e-commerce-mobile-app-backend.onrender.com/api/v1';

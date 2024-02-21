import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducer/userReducer';
import { otherReducer } from './reducer/otherReducer';
import { productReducer } from './reducer/productReducer';
import { cartReducer } from './reducer/cartReducer';
export const store = configureStore({
  reducer: {
    user: userReducer,
    other: otherReducer,
    products: productReducer,
    cart: cartReducer,
  },
});

export const server = 'https://e-commerce-mobile-app-backend.onrender.com/api/v1';

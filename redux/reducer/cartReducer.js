import { createReducer } from '@reduxjs/toolkit';

export const cartReducer = createReducer(
  {
    cartItem: [],
  },
  (builder) => {
    builder
      .addCase('addToCart', (state, action) => {
        const item = action.payload;
        const isExist = state.cartItem.find((i) => i.product === item.product);

        if (isExist) {
          state.cartItem = state.cartItem.map((i) => {
            if (i.product === isExist.product) {
              return item;
            } else {
              return i;
            }
          });
        } else {
          state.cartItem.push(item);
        }
      })
      .addCase('removeFromCart', (state, action) => {
        const id = action.payload;
        state.cartItem = state.cartItem.filter((i) => i.product !== id);
      })
      .addCase('clearCart', (state) => {
        state.cartItem = [];
      });
  }
);

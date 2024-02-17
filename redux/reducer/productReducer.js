import { createReducer } from '@reduxjs/toolkit';

export const productReducer = createReducer({ products: [], product: {} }, (builder) => {
  builder
    .addCase('getAllProductsRequest', (state) => {
      state.loading = true;
    })
    .addCase('getAdminProductRequest', (state) => {
      state.loading = true;
    })
    .addCase('getProductDetailsRequest', (state) => {
      state.loading = true;
    })

    .addCase('getAllProductsSuccess', (state, action) => {
      state.loading = false;
      state.products = action.payload;
    })
    .addCase('getAdminProductSuccess', (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.inStock = action.payload.inStock;
      state.outOfStock = action.payload.outOfStock;
    })
    .addCase('getProductDetailsSuccess', (state, action) => {
      state.loading = false;
      state.products = action.payload;
    })
    .addCase('getAllProductsFail', (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase('getAdminProductFail', (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase('getProductDetailsFail', (state, action) => {
      state.loading = false;
      state.message = action.payload;
    });
  builder.addCase('clearError', (state) => {
    state.error = null;
  });
  builder.addCase('clearMessage', (state) => {
    state.message = null;
  });
});

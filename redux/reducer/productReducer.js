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
      state.products = action.payload.products;
      state.inStock = action.payload.isStock;
      state.outOfStock = action.payload.outOfStock;
    })
    .addCase('getProductDetailsSuccess', (state, action) => {
      state.loading = false;
      state.product = action.payload;
    })
    .addCase('getAllProductsFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase('getAdminProductFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase('getProductDetailsFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  // .addCase('deleteProductImagesRequest', (state) => {
  //   state.loading = true;
  // })
  // .addCase('deleteProductImagesSuccess', (state, action) => {
  //   state.loading = false;
  //   state.message = action.payload;
  // })
  // .addCase('deleteProductImagesFail', (state, action) => {
  //   state.loading = false;
  //   state.error = action.payload;
  // })
  // .addCase('updateProductImagesRequest', (state) => {
  //   state.loading = true;
  // })
  // .addCase('updateProductImagesSuccess', (state, action) => {
  //   state.loading = false;
  //   state.message = action.payload;
  // })
  // .addCase('updateProductImagesFail', (state, action) => {
  //   state.loading = false;
  //   state.error = action.payload;
  // });

  builder.addCase('clearError', (state) => {
    state.error = null;
  });
  builder.addCase('clearMessage', (state) => {
    state.message = null;
  });
});

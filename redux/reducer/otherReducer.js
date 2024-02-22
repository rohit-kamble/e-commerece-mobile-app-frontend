import { createReducer } from '@reduxjs/toolkit';

export const otherReducer = createReducer({ loading: false }, (builder) => {
  builder
    .addCase('updatePasswordRequest', (state) => {
      state.loading = true;
    })
    .addCase('updatePasswordSuccess', (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase('updatePasswordFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase('updateProfileRequest', (state) => {
      state.loading = true;
    })
    .addCase('updateProfileSuccess', (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase('updateProfileFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase('updateProfilePicRequest', (state) => {
      state.loading = true;
    })
    .addCase('updateProfilePicSuccess', (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase('updateProfilePiceFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase('placeOrderRequest', (state) => {
      state.loading = true;
    })
    .addCase('placeOrderSuccess', (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase('placeOrderFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase('processOrderRequest', (state) => {
      state.loading = true;
    })
    .addCase('processOrderSuccess', (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase('processOrderFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase('addCategoryRequest', (state) => {
      state.loading = true;
    })
    .addCase('addCategorySuccess', (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase('addCategoryFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase('deleteCategoryRequest', (state) => {
      state.loading = true;
    })
    .addCase('deleteCategorySuccess', (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase('deleteCategoryFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase('addProductRequest', (state) => {
      state.loading = true;
    })
    .addCase('addProductSuccess', (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase('addProductFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase('updateProductRequest', (state) => {
      state.loading = true;
    })
    .addCase('updateProductSuccess', (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase('updateProductFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase('updateProductImagesRequest', (state) => {
      state.loading = true;
    })
    .addCase('updateProductImagesSuccess', (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase('updateProductImagesFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase('deleteProductImagesRequest', (state) => {
      state.loading = true;
    })
    .addCase('deleteProductImagesSuccess', (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase('deleteProductImagesFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase('deleteProductRequest', (state) => {
      state.loading = true;
    })
    .addCase('deleteProductSuccess', (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase('deleteProductFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  builder.addCase('clearError', (state) => {
    state.error = null;
  });
  builder.addCase('clearMessage', (state) => {
    state.message = null;
  });
});

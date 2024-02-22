import { server } from '../store';
import axios from 'axios';

export const updatePassword = (oldPassword, newPassword) => async (dispatch) => {
  try {
    dispatch({
      type: 'updatePasswordRequest',
    });
    const { data } = await axios.put(
      `${server}/user/change-password`,
      {
        oldPassword,
        newPassword,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    dispatch({
      type: 'updatePasswordSuccess',
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: 'updatePasswordFail',
      payload: error.response?.data?.message || 'something wrong',
    });
  }
};

export const updateProfile =
  ({ name, email, address, city, country, pinCode }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: 'updateProfileRequest',
      });
      const { data } = await axios.put(
        `${server}/user/update-profile`,
        { name, email, address, city, country, pinCode },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      dispatch({
        type: 'updateProfileSuccess',
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: 'updateProfileFail',
        payload: error.response?.data?.message || 'something wrong',
      });
    }
  };

export const updatePic = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: 'updateProfilePicRequest',
    });
    const { data } = await axios.put(`${server}/user/update-pic`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });
    dispatch({
      type: 'updateProfilePicSuccess',
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: 'updateProfilePiceFail',
      payload: error.response.data.message,
    });
  }
};

export const placeHolder =
  (
    shippingInfo,
    orderItems,
    itemsPrice,
    texPrice,
    shippingCharges,
    totalAmount,
    paymentInfo,
    paymentMethod
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: 'placeOrderRequest',
      });
      const { data } = await axios.post(
        `${server}/order/new`,
        {
          shippingInfo,
          orderItems,
          itemsPrice,
          texPrice,
          shippingCharges,
          totalAmount,
          paymentInfo,
          paymentMethod,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      dispatch({
        type: 'placeOrderSuccess',
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: 'placeOrderFail',
        payload: error.response?.data?.message || 'something wrong',
      });
    }
  };

export const processOrder = (id) => async (dispatch) => {
  try {
    dispatch({
      type: 'processOrderRequest',
    });
    const { data } = await axios.put(`${server}/order/single/${id}`, {
      withCredentials: true,
    });
    // console.log('---', data);
    dispatch({
      type: 'processOrderSuccess',
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: 'processOrderFail',
      payload: error.response?.data?.message || 'something wrong',
    });
  }
};

export const addCategory = (category) => async (dispatch) => {
  try {
    dispatch({
      type: 'addCategoryRequest',
    });
    const { data } = await axios.post(
      `${server}/product/category`,
      { category },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    dispatch({
      type: 'addCategorySuccess',
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: 'addCategoryFail',
      payload: error.response?.data?.message || 'something wrong',
    });
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch({
      type: 'deleteCategoryRequest',
    });
    const { data } = await axios.delete(`${server}/product/category/${id}`, {
      withCredentials: true,
    });
    // console.log('---', data);
    dispatch({
      type: 'deleteCategorySuccess',
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: 'deleteCategoryFail',
      payload: error.response?.data?.message || 'something wrong',
    });
  }
};

export const createProduct = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: 'addProductRequest',
    });
    const { data } = await axios.post(`${server}/product/new`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });
    dispatch({
      type: 'addProductSuccess',
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: 'addProducteFail',
      payload: error.response.data.message,
    });
  }
};

export const updateProduct =
  (id, name, description, price, stock, category) => async (dispatch) => {
    try {
      dispatch({
        type: 'updateProductRequest',
      });
      const { data } = await axios.put(
        `${server}/product/single/${id}`,
        { id, name, description, price, stock, category },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      dispatch({
        type: 'updateProductSuccess',
        payload: data.products,
      });
    } catch (error) {
      dispatch({
        type: 'updateProductFail',
        payload: error.response?.data?.message || 'something wrong',
      });
    }
  };

export const updateProductImages = (productId, formData) => async (dispatch) => {
  try {
    dispatch({
      type: 'updateProductImagesRequest',
    });
    const { data } = await axios.post(`${server}/product/images/${productId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });

    dispatch({
      type: 'updateProductImagesSuccess',
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: 'updateProductImagesFail',
      payload: error.response?.data?.message || 'something wrong',
    });
  }
};

export const deleteProductImages = (productId, imageId) => async (dispatch) => {
  try {
    dispatch({
      type: 'deleteProductImagesRequest',
    });
    const { data } = await axios.delete(`${server}/product/images/${productId}?id=${imageId}`);

    dispatch({
      type: 'deleteProductImagesSuccess',
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: 'deleteProductImagesFail',
      payload: error.response?.data?.message || 'something wrong',
    });
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  try {
    dispatch({
      type: 'deleteProductRequest',
    });
    const { data } = await axios.delete(`${server}/product/single/${productId}`, {
      withCredentials: true,
    });

    dispatch({
      type: 'deleteProductSuccess',
      payload: data.message,
    });
  } catch (error) {
    console.log('errot', error);
    dispatch({
      type: 'deleteProductFail',
      payload: error.response?.data?.message || 'something wrong',
    });
  }
};

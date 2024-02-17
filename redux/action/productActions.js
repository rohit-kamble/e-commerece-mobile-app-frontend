import axios from 'axios';
import { server } from '../store';

export const getAllProducts = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: 'getAllProductsRequest',
    });
    console.log('url', `${server}/product/all`);
    const { data } = await axios.get(`${server}/product/all`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });
    dispatch({
      type: 'getAllProductsSuccess',
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: 'getAllProductsFail',
      payload: error.response?.data?.message,
    });
  }
};
export const getAdminProducts = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: 'getAdminProductRequest',
    });
    const { data } = await axios.put(`${server}/product/admin`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });
    dispatch({
      type: 'getAdminProductSuccess',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'getAdminProductFail',
      payload: error.response.data.message,
    });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: 'getProductDetailsRequest',
    });
    const { data } = await axios.put(`${server}/product/single/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });
    dispatch({
      type: 'getProductDetailsSuccess',
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: 'getProductDetailsFail',
      payload: error.response.data.message,
    });
  }
};

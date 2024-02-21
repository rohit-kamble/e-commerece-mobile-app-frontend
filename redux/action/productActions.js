import axios from 'axios';
import { server } from '../store';

export const getAllProducts =
  (keywords = '', category = '') =>
  async (dispatch) => {
    try {
      let response = null;
      dispatch({
        type: 'getAllProductsRequest',
      });
      response = await axios.get(`${server}/product/all?keyword=${keywords}&category=${category}`, {
        withCredentials: true,
      });
      dispatch({
        type: 'getAllProductsSuccess',
        payload: response.data.products,
      });
    } catch (error) {
      dispatch({
        type: 'getAllProductsFail',
        payload: error.response.data.message,
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
    const { data } = await axios.get(`${server}/product/single/${id}`, {
      withCredentials: true,
    });
    dispatch({
      type: 'getProductDetailsSuccess',
      payload: data?.products,
    });
  } catch (error) {
    dispatch({
      type: 'getProductDetailsFail',
      payload: error.response?.data?.message,
    });
  }
};

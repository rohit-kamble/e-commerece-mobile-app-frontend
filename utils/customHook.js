import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { useEffect } from 'react';
import { loadUser } from '../redux/action/userAction.js';
import axios from 'axios';
import { server } from '../redux/store.js';
import { useState } from 'react';
import { getAdminProducts } from '../redux/action/productActions.js';

export const useMessageAndErrorFromUser = (navigation, navigateTo = 'login', dispatch) => {
  const { loading, message, error, isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    if (error) {
      dispatch({
        type: 'clearError',
      });
      Toast.show({
        type: 'error',
        text1: error,
      });
    }
    if (message) {
      navigation.reset({
        index: 0,
        routes: [{ name: navigateTo }],
      });
      Toast.show({
        type: 'success',
        text1: message,
      });
      dispatch({
        type: 'clearMessage',
      });
      dispatch(loadUser());
    }
  }, [error, message, dispatch]);

  return { loading };
};

export const useMessageAndErrorFromOther = ({
  dispatch,
  navigation,
  navigateTo = 'login',
  fun,
}) => {
  const { loading, message, error } = useSelector((state) => state.other);
  // console.log('navigateTo before==', message, error);
  useEffect(() => {
    if (error) {
      dispatch &&
        dispatch({
          type: 'clearError',
        });
      Toast.show({
        type: 'error',
        text1: error,
      });
    }
    if (message) {
      dispatch &&
        dispatch({
          type: 'clearMessage',
        });
      Toast.show({
        type: 'success',
        text1: message,
      });

      console.log('navigateTo after==', navigateTo, navigation, message, dispatch);
      navigateTo && navigation && navigation.navigate(navigateTo);

      fun && dispatch(fun());
    }
  }, [error, message, dispatch]);

  return { loading, loadingPic: loading };
};

export const useSetCategories = (setCategories, isFocused) => {
  useEffect(() => {
    axios
      .get(`${server}/product/categories`)
      .then((res) => {
        setCategories(res.data.categories);
      })
      .catch((error) => {
        Toast.show({
          type: 'error',
          text1: error.response.data.message,
        });
      });
  }, [isFocused]);

  // return { loading, loadingPic: loading };
};

export const useGetOrders = (isFocused, isAdmin = false) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${server}/order/${isAdmin ? 'admin' : 'my'}`)
      .then((res) => {
        setOrders(res.data.orders);
        setLoading(false);
      })
      .catch((error) => {
        Toast.show({
          type: 'error',
          text1: error.response.data.message,
        });
      });
  }, [isFocused]);
  return { loading, orders };
};

export const useAdminProducts = (dispatch, isFocused) => {
  const { products, inStock, outOfStock, error, loading } = useSelector((state) => state.products);
  useEffect(() => {
    if (error) {
      dispatch({
        type: 'clearError',
      });
      Toast.show({
        type: 'error',
        text1: error,
      });
    }
    dispatch(getAdminProducts());
  }, [dispatch, isFocused, error]);

  return { products, inStock, outOfStock, loading };
};

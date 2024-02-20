import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { useEffect } from 'react';
import { loadUser } from '../redux/action/userAction.js';
import axios from 'axios';
import { server } from '../redux/store.js';

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

export const useMessageAndErrorFromOther = ({ navigation, navigateTo, dispatch, fun }) => {
  const { loading, message, error, isAuthenticated } = useSelector((state) => state.other);
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
      Toast.show({
        type: 'success',
        text1: message,
      });
      dispatch({
        type: 'clearMessage',
      });
      navigateTo && navigation.navigate(navigateTo);
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

import { server } from '../store';
import axios from 'axios';

export const updatePassword = (oldPassword, newPassword) => async (dispatch) => {
  try {
    dispatch({
      type: 'updatePasswordRequest',
    });
    console.log('Hii Call');
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
    console.log('error=', error);
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
      console.log('Hii Call');
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
      console.log('error=', error);
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

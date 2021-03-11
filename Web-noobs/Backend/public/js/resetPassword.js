/* eslint-disable */
import axios from 'axios';
import { token } from 'morgan';
import { showAlert } from './alerts';

export const ResetMyPassword = async (password, passwordConfirm, tok) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/users/resetPassword/${tok}`,
      data: {
        password,
        passwordConfirm
      }
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Your password is Set!');
      window.setTimeout(() => {
        location.assign('/login');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

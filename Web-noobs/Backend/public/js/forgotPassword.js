/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const forgotMyPassword = async email => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/forgotPassword',
      data: {
        email
      }
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Reset Token Sent to Email!');
      window.setTimeout(() => {
        location.assign('/forgotMyPassword');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

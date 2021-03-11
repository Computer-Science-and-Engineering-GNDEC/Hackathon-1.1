/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm
      }
    });
    if (res.data.status === 'success') {
      showAlert('success', 'You will recieve a verification link to your email in under 6 minutes');
      window.setTimeout(() => {
        location.assign('/signup');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

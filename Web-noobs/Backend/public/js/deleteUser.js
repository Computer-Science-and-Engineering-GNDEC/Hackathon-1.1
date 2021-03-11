/* eslint-disable*/

import axios from 'axios';
import { showAlert } from './alerts';

export const deleteThisUser = async id => {
  try {
    const res = await axios({
      url: `/api/v1/users/${id}`,
      method: 'DELETE',
      data: null
    });
    if (res.statusCode === 200) {
      location.assign('/');
      showAlert('success', 'User deleted succefully!');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

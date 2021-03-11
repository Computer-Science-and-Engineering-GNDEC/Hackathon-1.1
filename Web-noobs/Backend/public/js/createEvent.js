/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const createNewEvent = async (
  name,
  duration,
  team,
  price,
  StartDates,
  description,
  link
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/events',
      data: {
        name,
        duration,
        team,
        price,
        StartDates,
        description,
        link
      }
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Event Created Succesfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

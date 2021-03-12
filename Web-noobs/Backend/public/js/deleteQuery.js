/* eslint-disable*/

import axios from "axios";
import { showAlert } from "./alerts";

export const deleteThisQuery = async (id) => {
  try {
    const res = await axios({
      url: `/api/v1/events/${id}`,
      method: "DELETE",
      data: null,
    });
    if (res.statusCode === 200) {
      location.assign("/");
      showAlert("success", "Query deleted succefully!");
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

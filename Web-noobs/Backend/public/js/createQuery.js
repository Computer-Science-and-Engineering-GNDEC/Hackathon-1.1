/* eslint-disable */
import axios from "axios";
import { showAlert } from "./alerts";

export const createNewQuery = async (title, query, branch, tags) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/queries",
      data: {
        title,
        query,
        branch,
        tags,
      },
    });
    if (res.data.status === "success") {
      showAlert("success", "Event Created Succesfully!");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

import { setCinema } from "./reducer";
import axios from "axios";

export const getCinemaHome = (slug, history) => async (dispatch) => {
  await axios
    .get(`http://localhost:8081/api/home/v1/cinema/${slug}`)
    .then((response) => {
      console.log(response);
      dispatch(setCinema(response?.data?.result));
    })
    .catch((error) => {
      console.log(error);
    });
};

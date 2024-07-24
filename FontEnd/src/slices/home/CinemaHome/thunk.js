import { setCinema } from "./reducer";
import axios from "axios";

export const getCinemaHome = (slug, city, history) => async (dispatch) => {
  await axios
    .get(`http://localhost:8081/api/home/cinema/v1/${slug}`, {
      params: { city },
    })
    .then((response) => {
      // console.log(response);
      dispatch(setCinema(response?.data?.result));
    })
    .catch((error) => {
      console.log(error);
    });
};

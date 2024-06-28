import { selectBooking } from "./reducer";
import axios from "axios";

export const getBooking = (slug, city, cinema) => async (dispatch) => {
  console.log(slug);
  console.log(city);
  console.log(cinema);
  await axios
    .get(`http://localhost:8081/api/home/v1/booking`, {
      params: { slug, city, cinema },
    })
    .then((response) => {
      console.log(response);
      dispatch(selectBooking(response?.data?.result));
    })
    .catch((error) => {
      console.log(error);
    });
};

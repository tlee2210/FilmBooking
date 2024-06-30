import { selectBooking } from "./reducer";
import axios from "axios";

export const getBooking = (slug, city, cinema) => async (dispatch) => {
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

export const getBookingTime = (id) => async (dispatch) => {
  console.log(id);
  // await axios
  //   .get(`http://localhost:8081/api/admin/v1/booking/${id}/movies`)
  //   .then((response) => {
  //     console.log(response);
  //     dispatch(setBookingMovies(response?.data?.result));
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
};

import { selectBooking, setBooking, setBuyFastTicket } from "./reducer";
import axios from "axios";

export const getBooking = (slug, city, cinema) => async (dispatch) => {
  await axios
    .get(`http://localhost:8081/api/home/v1/booking`, {
      params: { slug, city, cinema },
    })
    .then((response) => {
      // console.log(response);
      dispatch(selectBooking(response?.data?.result));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getBookingTime = (id, history) => async (dispatch) => {
  // console.log(id);
  await axios
    .get(`http://localhost:8081/api/home/v1/booking/${id}`)
    .then((response) => {
      // console.log(response);
      localStorage.setItem(
        "bookingData",
        JSON.stringify(response?.data?.result)
      );
      dispatch(setBooking(response?.data?.result));
      history("/booking");
    })
    .catch((error) => {
      console.error(error);
    });
};

export const BuyFastTicket =
  (slugmovie, slugcinema, time, history) => async (dispatch) => {
    await axios
      .get(`http://localhost:8081/api/home/v1/booking/buy-ticket`, {
        params: { slugmovie, slugcinema, time },
      })
      .then((response) => {
        // console.log(response);
        dispatch(setBuyFastTicket(response?.data?.result));
      })
      .catch((error) => {
        console.error(error);
      });
  };

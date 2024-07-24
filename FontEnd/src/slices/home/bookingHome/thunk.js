import {
  selectBooking,
  setBooking,
  setBuyFastTicket,
  setVoucher,
  setSeatBooked,
} from "./reducer";
import { Success, Error } from "../../message/reducer";
import axios from "axios";

export const getBooking = (slug, city, cinema) => async (dispatch) => {
  await axios
    .get(`http://localhost:8081/api/home/booking/v1`, {
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
    .get(`http://localhost:8081/api/home/booking/v1/${id}`)
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

  await axios
    .get(`http://localhost:8081/api/home/booking/v1/seat-booked/${id}`)
    .then((response) => {
      // console.log(response);
      localStorage.setItem(
        "seatsBooked",
        JSON.stringify(response?.data?.result?.seatBooked)
      );
      dispatch(setSeatBooked({ data: response?.data?.result }));
    })
    .catch((error) => {
      console.error(error);
    });
};

export const BuyFastTicket =
  (slugmovie, slugcinema, time, history) => async (dispatch) => {
    await axios
      .get(`http://localhost:8081/api/home/booking/v1/buy-ticket`, {
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

export const ApplyVoucher = (formData, history) => async (dispatch) => {
  await axios
    .post(`http://localhost:8081/api/home/booking/v1/apply-voucher`, formData)
    .then((response) => {
      // console.log(response);
      dispatch(setVoucher(response?.data?.result));
    })
    .catch((error) => {
      console.error(error);
      dispatch(Error(error.response?.data?.message));
    });
};
// http://localhost:8081/api/home/booking/v1/apply-voucher

export const getPaymentVnpayMethods = (formData) => async (dispatch) => {
  await axios
    .post(`http://localhost:8081/api/payment/v1/creat/api/paymente_payment_vnpay`, formData)
    .then((response) => {
      // console.log(response);
      window.location.href = response?.data?.result;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getPaymentResult = (formData, history) => async (dispatch) => {
  await axios
    .post(`http://localhost:8081/api/payment/v1/booking_paypal`, formData)
    .then((response) => {
      // console.log(response);
      // getPaymentResult
      history("/profile");
    })
    .catch((error) => {
      console.error(error);
    });
};
